import { Profiles } from '../profile/types'

export interface SignInRequest {
  username: string
  password: string
  redirect: string | undefined
}

export interface AccessData {
  selected_school: Schools
  selected_profile: Profiles
  profiles: Profiles[]
  redirect?: string
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
  token: string | undefined
  refresh_token: string | undefined
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
export interface Schools {
  id: string
  user_id?: string
  integration_id: string | undefined
  name: string
  time_zone?: string
  roles: string[]
  label: string
  value: string
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
  user: {
    user: {
      guid: string
    }
  }
}
