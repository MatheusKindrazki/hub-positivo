import { decode, JwtPayload } from 'jsonwebtoken'

import { Store, AnyAction } from 'redux'

import { ApplicationState } from '~/store/store'
import { Actions as GlobalActions } from '~/store/modules/global/actions'
import { RefreshTokenApi } from '~/store/modules/auth/types'
import { Actions as AuthActions } from '~/store/modules/auth/actions'

import { toast } from '@psdhub/common/utils'
import { ApiResponse, setAuthorization } from '@psdhub/api'

import sessionStarted from '~/services/mixpanel/sessionStarted'
import { EEMConnectPost } from '~/services/eemConnect'

import { enableRefreshToken } from '~/utils/enableRefreshToken'

export interface RefreshTokenMiddlewareParams {
  exp: number
  refresh_token: string | null
  reduced_token: string | null
  dispatch: Store<ApplicationState, AnyAction>['dispatch']
}

const refreshTokenMiddleware = async ({
  exp,
  refresh_token,
  reduced_token,
  dispatch
}: RefreshTokenMiddlewareParams): Promise<boolean> => {
  const authToken = reduced_token ?? ''

  if (enableRefreshToken(exp)) {
    dispatch({
      type: GlobalActions.ENABLE_REFRESH_TOKEN,
      payload: false
    })

    const response = await EEMConnectPost({
      endpoint: 'connect/token',
      data: {
        refresh_token: refresh_token,
        grant_type: 'refresh_token'
      }
    })

    const { data, ok } = response as ApiResponse<RefreshTokenApi>

    if (!ok) {
      dispatch({
        type: AuthActions.SIGN_OUT
      })

      toast.warn(
        'Desculpe sua sessão expirou, realiza o login novamente para continuar!'
      )
    }

    setAuthorization(authToken, 'all')

    const { exp: decodedExp } = decode(authToken) as JwtPayload

    dispatch({
      type: AuthActions.REFRESH_TOKEN_SUCCESS,
      payload: {
        token: reduced_token,
        refresh_token: data?.refresh_token,
        exp: decodedExp
      }
    })

    // dispara evento de sessão iniciada
    sessionStarted({ tokenRefreshed: true })

    return true
  }

  return false
}

export default refreshTokenMiddleware
