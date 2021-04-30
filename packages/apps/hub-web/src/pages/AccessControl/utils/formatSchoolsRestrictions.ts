import { Schools } from '~/store/modules/solutions/types'

export const formatSchoolsRestrictions = (
  data: Schools[],
  padrao: boolean
): string => {
  if (padrao && !data.length) return 'Todas'
  if (!padrao && !data.length) return 'Nenhuma'

  const schools = data.reduce(
    (accumulator, current, index) => {
      const school = current.nome
      accumulator += school
      accumulator += index + 1 >= data.length ? '' : ', '
      return accumulator
    },
    padrao ? 'Todas, exceto: ' : 'Apenas: '
  )
  return schools
}
