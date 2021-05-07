interface Option {
  label: string
  value: string
}
const createCategoryOptions = (categories: any[]): Option[] => {
  // usando a tipo 'any' no parametro da funcao pois ela pode
  // receber tanto um array de escolas como de categorias
  const options = categories.map(element => {
    return {
      label: element.nome,
      value: element.id
    }
  })

  return options
}

export const schoolRestrictionRules = [
  {
    label: 'Todas Escolas',
    value: 'Todas Escolas'
  },
  {
    label: 'Apenas',
    value: 'Apenas'
  },
  {
    label: 'Exceto',
    value: 'Exceto'
  }
]

export default createCategoryOptions
