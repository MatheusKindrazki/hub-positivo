export interface SolutionsReducer {
  loading: boolean
  data?: SolutionAPI[]
}

export interface SolutionAPI {
  id: string
  ativo: boolean
  nome: string
  cor: string
  solucoes: Solution[]
}

export interface Solution {
  id: string
  nome: string
  descricao: string
  arquivo: string
  link?: string
  tipoRenderizacao: string
  notificacao?: string
  ativo: boolean
}
