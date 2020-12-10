import { apiEEM } from '@hub/api'

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

type ReturnConnect<T> = Promise<ApiResponse<T>>

async function EEMConnectPost<T>(attributes: EEMProps): ReturnConnect<T> {
  const { data, endpoint } = attributes

  const sendInfo = {
    ...data,
    client_id: process.env.REACT_APP_API_AUTH_CLIENT_ID,
    client_secret: process.env.REACT_APP_API_AUTH_SECRET_ID,
    scope: process.env.REACT_APP_API_AUTH_SCOPE
  }

  apiEEM.setHeaders({
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    accept: '*/*'
  })

  return await apiEEM.post(endpoint, qs.stringify(sendInfo))
}

export { EEMConnectPost }
