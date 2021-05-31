import { decode } from 'jsonwebtoken'

import { capitalize } from '@psdhub/common/utils'

import { EEMConnectPost } from './eemConnect'
import { SignInSuccess } from '../@types/auth'

export interface UserAuthProps {
  username: string
  password: string
}

async function userAuth(data: UserAuthProps): Promise<SignInSuccess> {
  const response = (await EEMConnectPost({
    endpoint: 'connect/token',
    data: {
      ...data,
      grant_type: 'password'
    }
  })) as { data: { access_token: string }; ok: boolean }

  if (!response.ok) {
    throw new Error('Ocorreu um erro no login!')
  }

  const user = decode(response?.data?.access_token) as any

  return {
    token: response.data?.access_token,
    info: {
      ...user,
      name: capitalize(user?.name as string)
    }
  }
}

export default userAuth
