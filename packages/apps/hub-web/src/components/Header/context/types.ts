import {
  RolesProps,
  SchoolsProps
} from '@psdhub/common/utils/prepareSchoolAndRoles'

export interface ContextHeaderProps {
  schoolList: SchoolsProps[]
  roleList: RolesProps[]
  setSchool: (data: SchoolsProps) => void
  setRole: (data: RolesProps) => void
  resetInfo: () => void
  defaultValue: {
    school?: SelectProps
    role?: SelectProps
  }
}

export interface SelectProps {
  value: string
  label: string
}
