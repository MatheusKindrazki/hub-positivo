import { Category } from '~/store/modules/category/types'

interface Option {
  label: string
  value: string
}
const createCategoryOptions = (categories: Category[]): Option[] => {
  const options = categories.map(category => {
    return {
      label: category.nome,
      value: category.id
    }
  })

  return options
}

export default createCategoryOptions
