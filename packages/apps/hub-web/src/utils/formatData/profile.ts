import { store } from '~/store'

import { ProfileTypesProps } from './types'

interface ProfileProps {
  activeProfiles: {
    [key: string]: boolean
  }
  profile: {
    guid: string
    profile: unknown
    name: string
    icon?: string
    colorProfile?: string
  }
  profileNames?: string[]
}

export default (): ProfileProps => {
  const {
    profile: { profiles, ...profile }
  } = store.getState()

  const profileNames = profiles?.map(p => p.name)

  const profileTypes = {
    is_teacher: 'Professor',
    is_student: 'Aluno',
    is_coordinator: 'Coordenador',
    is_admin: 'Administrador',
    is_family: 'Família'
  }

  // Criar um objeto de perfis ativos
  const activeProfiles: any = {}
  Object.keys(profileTypes).forEach(p => {
    const types = profileTypes[p as ProfileTypesProps]

    let length = profileNames?.length || 0
    profileNames?.forEach((n, i) => {
      if (n === types) {
        activeProfiles[p] = true

        length = 999
        return
      }

      if (length - 1 === i) {
        activeProfiles[p] = false
      }
    })
  })

  return { profile, profileNames, activeProfiles }
}
