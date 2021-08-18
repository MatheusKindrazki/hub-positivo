import { decode } from 'jsonwebtoken'
import { ApiResponse } from 'apisauce'

import { Actions as GlobalActions } from '~/store/modules/global/actions'
import { RefreshTokenApi } from '~/store/modules/auth/types'
import { Actions as AuthActions } from '~/store/modules/auth/actions'
import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import sessionStarted from '~/services/mixpanel/sessionStarted'
import clearMixPanelSession from '~/services/mixpanel/clearAll'
import history from '~/services/history'
import { EEMConnectPost } from '~/services/eemConnect'

import { enableRefreshToken } from '~/utils/enableRefreshToken'

export default async (): Promise<boolean> => {
  const { exp, refresh_token, reduced_token } = store.getState().auth

  if (enableRefreshToken(exp)) {
    store.dispatch({
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
      store.dispatch({
        type: AuthActions.SIGN_OUT
      })

      toast.warn(
        'Desculpe sua sessão expirou, realiza o login novamente para continuar!'
      )

      setTimeout(() => history.push('/login'), 500)

      clearMixPanelSession()
    }

    api.setHeaders({
      Authorization: `Bearer ${reduced_token || ''}`
    })

    const user = decode(reduced_token as string) as { exp: number }

    store.dispatch({
      type: AuthActions.REFRESH_TOKEN_SUCCESS,
      payload: {
        token: reduced_token,
        refresh_token: data?.refresh_token,
        exp: user?.exp
      }
    })

    // dispara evento de sessão iniciada
    sessionStarted({ tokenRefreshed: true })

    return true
  }

  return false
}
