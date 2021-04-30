import { Permissions } from '~/store/modules/solutions/types'

export const formatPermissions = (data: Permissions[]): string => {
  const profiles = data.reduce((accumulator, current, index) => {
    const profile = current.perfil[0] + current.perfil.slice(1).toLowerCase()
    if (!current.niveisEnsino.length) {
      accumulator += `${profile}`
    } else {
      accumulator += `${profile} (${current.niveisEnsino.toString()})`
    }
    accumulator += index + 1 >= data.length ? '' : ', '

    return accumulator
  }, '')
  return profiles
}
