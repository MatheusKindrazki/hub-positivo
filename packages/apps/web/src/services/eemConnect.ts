import qs from 'qs'
import { ApiResponse } from 'apisauce'

import { getInstance } from '@psdhub/api'

export interface EEMProps {
  type?: 'auth' | 'info'
  endpoint: string
  data: {
    grant_type: 'change_school' | 'password' | 'refresh_token'
    access_token?: string
    refresh_token?: string | null
    school_id?: string
    password?: string
    username?: string
  }
}

export interface EEMPropsInfo<T> {
  endpoint: string
  token: string
  data: T
}

type ReturnConnect<T> = Promise<ApiResponse<T>>

async function EEMConnectPost<T>(attributes: EEMProps): ReturnConnect<T> {
  const { data, endpoint, type = 'auth' } = attributes

  const sendInfo = {
    ...data,
    client_id: process.env.REACT_APP_API_AUTH_CLIENT_ID,
    client_secret: process.env.REACT_APP_API_AUTH_SECRET_ID,
    scope: process.env.REACT_APP_API_AUTH_SCOPE
  }

  const api = type === 'auth' ? getInstance('auth') : getInstance('eem')

  api.setHeaders({
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    accept: '*/*'
  })

  return api.post(endpoint, qs.stringify(sendInfo))
}

async function EEMConnectGET<T, A = unknown>(
  attributes: EEMPropsInfo<T>
): Promise<ApiResponse<A>> {
  const { data, endpoint, token } = attributes

  const api = getInstance('eem')

  return api.get(endpoint, data, {
    headers: { Authorization: token }
  })
}

export { EEMConnectPost, EEMConnectGET }
