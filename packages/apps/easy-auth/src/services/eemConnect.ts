import qs from 'qs'
import { ApiResponse } from 'apisauce'

import { apiEEMAuth } from '@psdhub/api'

export interface EEMProps {
  endpoint: string
  data: {
    grant_type: 'change_school' | 'password'
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
  const { data, endpoint } = attributes

  const sendInfo = {
    ...data,
    client_id: process.env.REACT_APP_API_AUTH_CLIENT_ID,
    client_secret: process.env.REACT_APP_API_AUTH_SECRET_ID,
    scope: process.env.REACT_APP_API_AUTH_SCOPE
  }

  apiEEMAuth.setHeaders({
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    accept: '*/*'
  })

  return apiEEMAuth.post(endpoint, qs.stringify(sendInfo))
}

export { EEMConnectPost }
