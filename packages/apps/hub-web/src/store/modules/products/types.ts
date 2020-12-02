export interface ProductRequest {
  search?: string
}

export interface ProductReducer {
  loading: boolean
  frameUrl?: string
  data?: CardProduct[]
}

export interface CardProduct {
  id: string
  nome: string
  cor: string
  solucoes: Product[]
}

export interface Product {
  id: string
  nome: string
  descricao: string
  arquivo: string
  integration_type?: string
  notificacao?: string
  ativo: boolean
}
