export interface SignInRequest {
  username: string
  password: string
  redirect: string | undefined
}

export interface AuthReducer {
  signed: boolean
  loading: boolean
  token: string | null
  auth_time: number
  iat: number
  exp: number
  signInStrike: boolean
}

export interface AuthApi {
  access_token: string
  expires_in: string
  token_type: string
}

export interface SignInSuccess {
  token: string | null
  auth_time: number | null
  exp: number | null
  iat: number | null
  user?: {
    name: string
    integration_id: string | null
    id: string | null
    guid: string | null
    username: string
    schools?: Schools[]
    email: string
  }
}
interface Schools {
  id: string
  user_id?: string
  integration_id: string | null
  name: string
  roles: string[]
}
