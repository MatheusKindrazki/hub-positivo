export interface SignInRequest {
  username: string
  password: string
  redirect: string | undefined
}

export interface AuthReducer {
  exp: number
  signed: boolean
  loading: boolean
  token: string | null
  signInStrike: boolean
  withoutAccess: boolean
  refresh_token: string | null
  reduced_token: string | null
}

export interface AuthApi {
  access_token: string
  refresh_token: string
  expires_in: string
  token_type: string
}

export interface SignInSuccess {
  token: string | null
  refresh_token: string | null
  exp: number | null
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
export interface RefreshToken {
  token: string | null
  refresh_token: string | null
  exp: number | null
}
export interface RefreshTokenApi {
  access_token: string | null
  refresh_token: string | null
  exp: number | null
}
export interface RehydrateAuth {
  auth: {
    exp: number
    iat: number
    token: string
    signed: boolean
    reduced_token: string
  }
}
