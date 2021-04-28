export interface CategoriesReducer {
  loading: boolean
  categories?: CategoryAPI[]
}

export interface CategoryAPI {
  id: string
  nome: string
  cor: string
  ativo: string
}
