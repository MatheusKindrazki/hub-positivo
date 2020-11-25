export interface SignInRequest {
  username: string
  password: string
}

export interface AuthReducer {
  signed: boolean
  loading: boolean
  token: string | null
  auth_time: number
  iat: number
  exp: number
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
    username: string
    schools?: Schools[]
    email: string
  }
}
interface Schools {
  id: string
  idUser: string
  integration_id: string | null
  name: string
  roles: string[]
}

interface Roles {
  name: string
}
