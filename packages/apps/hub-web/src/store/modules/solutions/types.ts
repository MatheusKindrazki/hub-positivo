export interface SolutionsReducer {
  loading: boolean
  data?: Category[]
}
export interface Category {
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
  permissions: Permissions[]
  restriction: Restriction[]
}

export interface Permissions {
  id: string
  perfil: string
  nivelEnsino: string[]
}

export interface Restriction {
  id: string
  idEscola: string
  nomeEscola: string
}
