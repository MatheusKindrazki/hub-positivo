export interface UserReducer {
  loading: boolean
  user?: User
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
  integration_id?: string
  id?: string
  username: string
  schools?: Schools[]
  email: string | null
}

export interface Schools {
  id: string
  name: string
  roles: string[]
}
