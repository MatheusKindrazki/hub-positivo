import { Solution } from '~/store/modules/solutions/types'
import { ProfilePermissionApiData } from '~/store/modules/permissions/types'

import { FormProps } from '@psdhub/common/components/Form'

import createOptions from './createOptions'

const formatProfilePermissions = (
  solution: Solution,
  profileOptions: ProfilePermissionApiData[]
) => {
  const profiles: { profile: string; level: string | null }[] = []

  solution.permissoes.map(profile => {
    if (!profile.niveisEnsino.length) {
      profiles.push({
        profile: profile.perfil,
        level: null
      })
    }
    return profile.niveisEnsino.map(nivelEnsino => {
      profiles.push({
        profile: profile.perfil,
        level: nivelEnsino
      })
    })
  })

  const formattedProfiles: ProfilePermissionApiData[] = []

  profiles.forEach(profile => {
    return profileOptions.forEach((profileOption: ProfilePermissionApiData) => {
      if (
        profileOption.perfil === profile.profile &&
        profileOption.nivelEnsino === profile.level
      ) {
        formattedProfiles.push(profileOption)
      }
    })
  })

  return formattedProfiles
}

const autocomplete = (
  solution: Solution,
  ref: React.RefObject<FormProps>,
  profileOptions: ProfilePermissionApiData[]
): void => {
  const tipoRenderizacao = {
    label: solution.tipoRenderizacao,
    value: solution.tipoRenderizacao
  }

  const padrao = solution.padrao
    ? !solution.escolas.length
      ? { label: 'Todas Escolas', value: 'todas escolas' }
      : { label: 'Exceto', value: 'exceto' }
    : { label: 'Apenas', value: 'apenas' }

  const schools = createOptions(solution.escolas)

  const permissions = formatProfilePermissions(solution, profileOptions)

  const profiles = createOptions(permissions)

  ref.current?.setData({
    nome: solution?.nome,
    descricao: solution?.descricao,
    link: solution.link,
    idCategoria: solution?.category,
    tipoRenderizacao,
    padrao,
    schools: [...schools],
    profiles: profiles
  })
}

export default autocomplete
