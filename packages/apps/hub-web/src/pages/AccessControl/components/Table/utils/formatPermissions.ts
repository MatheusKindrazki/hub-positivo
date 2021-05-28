import { Permissions } from '~/store/modules/solutions/types'

function camelize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formatPermissionsToString = (data: Permissions[]): string => {
  const profiles = data.map(p =>
    `${camelize(p.perfil)} (${p.niveisEnsino.join()})`.replace(' ()', '')
  )

  return profiles.join(', ')
}
