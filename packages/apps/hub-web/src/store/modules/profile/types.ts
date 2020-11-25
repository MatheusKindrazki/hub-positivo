import { VariantsProps } from '@hub/common/layout/styles/colors'

export interface ProfileReducer {
  id: number | string
  profile: unknown
  name: string
  icon?: string
  colorProfile?: string
  profiles?: Profiles[]
}

export interface Profile {
  name: string
  profile: VariantsProps
}

export interface Profiles {
  id: number
  name: string
  icon: string
  colorProfile: string
}
