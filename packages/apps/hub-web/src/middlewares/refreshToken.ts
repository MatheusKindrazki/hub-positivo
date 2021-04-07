import { decode } from 'jsonwebtoken'
import { ApiResponse } from 'apisauce'

import { Actions as GlobalActions } from '~/store/modules/global/actions'
import { RefreshTokenApi } from '~/store/modules/auth/types'
import { Actions as AuthActions } from '~/store/modules/auth/actions'
import { store } from '~/store'

import { toast } from '@hub/common/utils'
import api from '@hub/api'

import history from '~/services/history'
import { EEMConnectPost } from '~/services/eemConnect'

export default async (): Promise<boolean> => {
  const { exp, refresh_token } = store.getState().auth
  const { enableMiddlewareRefreshToken } = store.getState().global

  const date = new Date().getTime()

  const now = Math.round(date / 1000)

  if (now >= exp && enableMiddlewareRefreshToken) {
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
    }

    api.setHeaders({
      Authorization: `Bearer ${data?.access_token || ''}`
    })

    const user = decode(data?.access_token as string) as { exp: number }

    store.dispatch({
      type: AuthActions.REFRESH_TOKEN_SUCCESS,
      payload: {
        token: data?.access_token,
        refresh_token: data?.refresh_token,
        exp: user?.exp
      }
    })

    return true
  }

  return false
}
