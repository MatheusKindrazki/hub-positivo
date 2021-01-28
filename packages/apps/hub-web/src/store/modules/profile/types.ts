import { VariantsProps } from '@hub/common/layout/styles/colors'

export interface ProfileReducer {
  guid: string
  profile: unknown
  name: string
  icon?: string
  colorProfile?: string
  profiles?: Profiles[]
}

export interface Profile {
  name: string
  guid: string
  colorProfile: string
  profile: VariantsProps
}

export interface Profiles {
  id: string
  name: string
  icon: string
  colorProfile: string
}
