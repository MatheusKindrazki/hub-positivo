import { Schools } from '~/store/modules/solutions/types'

export const formatSchoolsRestrictions = (
  schools: Schools[],
  padrao: boolean
): string => {
  if (padrao && !schools.length) return 'Todas as Escolas'
  if (!padrao && !schools.length) return 'Nenhuma Escola'

  const formattedSchools = schools.map(s => s.nome)

  return `${padrao ? 'Todas, exceto: ' : 'Apenas: '} ${formattedSchools.join()}`
}
