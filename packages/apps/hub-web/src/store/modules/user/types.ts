export interface UserReducer {
  loading: boolean
  user?: User
  avatar: string
  school?: {
    value: string
    label: string
    roles: string[]
  }
}

export interface User {
  name: string | null
  schools?: Schools[]
  email: string | null
}

export interface Schools {
  id: string
  name: string
  roles: string[]
}
