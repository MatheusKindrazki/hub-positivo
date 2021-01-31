import { decode } from 'jsonwebtoken'
import { ApiResponse } from 'apisauce'

import { Actions as GlobalActions } from '~/store/modules/global/actions'
import { RefreshTokenApi } from '~/store/modules/auth/types'
import { Actions as AuthActions } from '~/store/modules/auth/actions'
import { store } from '~/store'

import api from '@hub/api'

import history from '~/services/history'
import { changeSchool } from '~/services/eemIntegration'
import { EEMConnectPost } from '~/services/eemConnect'

api.axiosInstance.interceptors.request.use(async config => {
  const { exp, refresh_token, token } = store.getState().auth
  const { enableMiddlewareRefreshToken } = store.getState().global

  const date = new Date().getTime()

  const now = Math.round(date / 1000)

  console.log('enableMiddlewareRefreshToken', enableMiddlewareRefreshToken)

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
    const res = await changeSchool({
      token: data?.access_token
    })

    store.dispatch({
      type: AuthActions.REDUCED_TOKEN_EEM,
      payload: res.access_token
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
