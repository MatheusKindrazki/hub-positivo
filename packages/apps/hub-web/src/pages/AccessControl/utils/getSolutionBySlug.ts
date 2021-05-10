import { Category, Solution } from '~/store/modules/solutions/types'

export interface SolutionWithCategory {
  solution: Solution
  category: string
  tipoRenderizacao: string
}

const getSolutionBySlug = (
  data: Category[],
  solutionSlug: string
): SolutionWithCategory | undefined => {
  let result

  data?.forEach(category => {
    category?.solucoes.forEach(solucao => {
      if (solutionSlug.includes(solucao?.slug as string)) {
        result = {
          solution: solucao,
          category: {
            label: category.nome,
            value: category.id
          },
          tipoRenderizacao: {
            value: solucao.tipoRenderizacao
          }
        }
      }
    })
  })

  if (result) return result
}

export default getSolutionBySlug
