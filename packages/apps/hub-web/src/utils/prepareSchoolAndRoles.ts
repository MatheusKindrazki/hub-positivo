import transpileProfile, { Transpile } from './transpileProfile'

export interface RolesProps {
  name: string
  icon: string
  colorProfile: string
  id: string
  label: string
  value: string
}

const prepareRoles = (data?: string[]): RolesProps[] => {
  if (!data) return []

  return data.map(i => ({
    name: transpileProfile(i as Transpile)?.label || 'Desconhecido',
    icon: transpileProfile(i as Transpile)?.label?.toLowerCase() || 'default',
    colorProfile:
      transpileProfile(i as Transpile)?.label?.toLowerCase() || 'default',
    id: transpileProfile(i as Transpile)?.value || 'default',
    label: transpileProfile(i as Transpile)?.label || 'Desconhecido',
    value: transpileProfile(i as Transpile)?.label?.toLowerCase() || 'default'
  }))
}

interface SchoolsParamsRequest {
  id: string
  name: string
  roles: string[]
}

export interface SchoolsProps {
  value: string
  label: string
  roles: string[]
}

const prepareSchool = (data?: SchoolsParamsRequest[]): SchoolsProps[] => {
  if (!data) return []

  return data.map(i => ({
    ...i,
    label: i.name,
    value: i.id,
    roles: i.roles
  }))
}
export { prepareRoles, prepareSchool }
