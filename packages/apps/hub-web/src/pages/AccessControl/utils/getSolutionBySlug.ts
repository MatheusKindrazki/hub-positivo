import { Category, Solution } from '~/store/modules/solutions/types'

interface SolutionWithCategory {
  solution: Solution
  category: string
}

const getSolutionBySlug = (
  data: Category[],
  solutionSlug: string
): SolutionWithCategory | undefined => {
  let result

  data?.forEach(category => {
    category?.solucoes.forEach(solucao => {
      if (solucao.slug === solutionSlug) {
        result = {
          solution: solucao,
          category: {
            label: category.nome,
            value: category.id
          }
        }
      }
    })
  })

  if (result) return result
}

export default getSolutionBySlug
