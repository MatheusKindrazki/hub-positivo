import { Category, Solution } from '~/store/modules/solutions/types'

const getSolutionBySlug = (
  data: Category[],
  solutionSlug: string
): Solution | undefined => {
  let result

  data?.forEach(category => {
    category?.solucoes.forEach(solucao => {
      if (solutionSlug.includes(solucao?.slug as string)) {
        // declarando nova constante para poder manipular campos do objeto
        const data: Solution = { ...solucao }

        data.category = {
          label: category.nome,
          value: category.id
        }
        result = data
      }
    })
  })

  if (result) return result
}

export default getSolutionBySlug
