export interface UserReducer {
  loading: boolean
  info?: User
  avatar: string
  school?: {
    value: string
    label: string
    user_id: string
    integration_id?: string
    roles: string[]
  }
}

export interface User {
  name: string | null
  username: string
  email: string | null
  email_salas: string | null
  integration_id?: string
  id?: string
  guid?: string
  schools?: Schools[]
  sub?: string
}

export interface Schools {
  id: string
  name: string
  roles: string[]
}
export interface UserAlterPass {
  pin?: string
  newPassword: string
}
export interface UserAlterPassPanel {
  oldPassword: string
  newPassword: string
}
export interface UserAlterPassApi {
  error: boolean
  errorMessage: string
}
