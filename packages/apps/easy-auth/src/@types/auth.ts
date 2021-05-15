export interface SignInSuccess {
  token: string | undefined
  info?: {
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
export interface LoggedData {
  selected_school: Schools
  profiles: Profiles[]
  selected_profile: Profiles
}
export interface Profiles {
  id: string
  name: string
  icon: string
  colorProfile: string
}
