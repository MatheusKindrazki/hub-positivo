export interface Category {
  id: string
  nome: string
  cor: string
  ativo: boolean
}

export interface CategoryReducer {
  loading: boolean
  categories: Category[]
}

export interface CategoryPostData {
  nome: string
}

export interface CategoryPostResponse {
  sucesso: boolean
  mensagem: string
}
