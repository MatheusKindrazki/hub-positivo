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
  slug: string
  link?: string
  tipoRenderizacao: string
  dataCadastro: Date
  notificacao?: string
  ativo: boolean
}

export type CardProps = 'Árvore Livros' | 'Gestão Escolar - Mhund'
