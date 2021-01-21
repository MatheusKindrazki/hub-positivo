import api from '@hub/api'

import { ApiResponse } from 'apisauce'
import { decode } from 'jsonwebtoken'

import { EEMConnectPost } from '~/services/eemConnect'
import history from '~/services/history'
import { store } from '~/store'
import { Actions as AuthActions } from '~/store/modules/auth/actions'
import { RefreshTokenApi } from '~/store/modules/auth/types'

api.axiosInstance.interceptors.request.use(async config => {
  const { exp, refresh_token } = store.getState().auth

  const date = (new Date() as unknown) as number

  const now = Math.round(date / 1000)

  if (now >= exp) {
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

      history.push('/login')
    }

    const user = decode(data?.access_token || '') as { exp: number }

    store.dispatch({
      type: AuthActions.REFRESH_TOKEN_SUCCESS,
      payload: {
        token: data?.access_token,
        refresh_token: data?.refresh_token,
        exp: user?.exp
      }
    })

    api.setHeaders({
      Authorization: `Bearer ${data?.access_token}`
    })

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${data?.access_token}`
      }
    }
  }

  return config
})
