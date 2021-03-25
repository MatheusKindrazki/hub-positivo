import { store } from '~/store'

import { ProfileTypesProps } from './types'

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
Object.keys(profileTypes).map(p => {
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

export { profile, profileNames, activeProfiles }
