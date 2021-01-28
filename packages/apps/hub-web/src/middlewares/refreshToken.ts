import api from '@hub/api'

import { ApiResponse } from 'apisauce'
import { decode } from 'jsonwebtoken'

import { EEMConnectPost } from '~/services/eemConnect'
import history from '~/services/history'
import { store } from '~/store'
import { Actions as AuthActions } from '~/store/modules/auth/actions'
import { RefreshTokenApi } from '~/store/modules/auth/types'
import { Actions as IntegrationActions } from '~/store/modules/productIntegrations/actions'

api.axiosInstance.interceptors.request.use(async config => {
  const { exp, refresh_token, token } = store.getState().auth

  const date = new Date().getTime()

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

    const user = decode(data?.access_token as string) as { exp: number }

    store.dispatch({
      type: AuthActions.REFRESH_TOKEN_SUCCESS,
      payload: {
        token: data?.access_token,
        refresh_token: data?.refresh_token,
        exp: user?.exp
      }
    })

    // chama a api para criar um token reduzido
    store.dispatch({
      type: IntegrationActions.UNIQUE_TOKEN_PER_SCHOOL_EEM
    })

    api.axiosInstance.defaults.headers.Authorization = `Bearer ${data?.access_token}`

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${data?.access_token}`
      }
    }
  }

  api.axiosInstance.defaults.headers.Authorization = `Bearer ${token}`

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
})
