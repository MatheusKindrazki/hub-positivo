import { apiEEMAuth, apiEEMInfos } from '@hub/api'

import { ApiResponse } from 'apisauce'
import qs from 'qs'

interface EEMProps {
  endpoint: string
  data: {
    grant_type: 'change_school' | 'password'
    access_token?: string
    school_id?: string
    password?: string
    username?: string
  }
}

interface EEMPropsInfo<T> {
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

  return await apiEEMAuth.post(endpoint, qs.stringify(sendInfo))
}

async function EEMConnectGET<T, A = any>(
  attributes: EEMPropsInfo<T>
): Promise<ApiResponse<A>> {
  const { data, endpoint, token } = attributes

  apiEEMInfos.setHeaders({
    'Content-Type': 'application/json',
    Authorization: token
  })

  return await apiEEMInfos.get(endpoint, data)
}
export { EEMConnectPost, EEMConnectGET }
