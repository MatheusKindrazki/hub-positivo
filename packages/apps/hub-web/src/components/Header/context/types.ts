import { RolesProps, SchoolsProps } from '~/utils/prepareSchoolAndRoles'

export interface ContextHeaderProps {
  schoolList: SchoolsProps[]
  roleList: RolesProps[]
  setSchool: (data: SchoolsProps) => void
  setRole: (data: RolesProps) => void
  resetInfo: () => void
  nonRole: boolean
  defaultValue: {
    school?: SelectProps
    role?: SelectProps
  }
}

export interface SelectProps {
  value: string
  label: string
}
