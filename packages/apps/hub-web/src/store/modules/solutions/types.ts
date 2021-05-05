export interface SolutionsReducer {
  loading: boolean
  data?: Solutions[]
}
export interface Solutions {
  id: string
  ordem: number
  ativo: boolean
  nome: string
  cor: string
  solucoes: Solution[]
}

export interface Solution {
  id: string
  nome: string
  slug?: string
  descricao: string
  arquivo: string
  link?: string
  tipoRenderizacao: string
  notificacao?: string
  ativo: boolean
  padrao: boolean
  ordem: number
  permissoes: Permissions[]
  escolas: Schools[]
}

export interface Permissions {
  id: string
  perfil: string
  niveisEnsino: string[]
}

export interface Schools {
  id: string
  idEscola: string
  nome: string
}
