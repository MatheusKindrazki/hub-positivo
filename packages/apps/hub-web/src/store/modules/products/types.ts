export interface ProductRequest {
  search?: string
}

export interface ProductReducer {
  loading: boolean
  frameUrl?: string
  frameName?: string
  data?: CardProduct[]
}

export interface CardProduct {
  id: string
  ativo: boolean
  nome: string
  cor: string
  solucoes: Product[]
}

export interface Product {
  id: string
  nome: string
  descricao: string
  arquivo: string
  link?: string
  tipoRenderizacao: string
  notificacao?: string
  ativo: boolean
}
