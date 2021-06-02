export interface SolutionsReducer {
  loading: boolean
  publicadas?: Category[]
  excluidas?: Category[]
}
export interface Category {
  id: string
  ordem: number
  ativo: boolean
  nome: string
  cor?: string
  solucoes: Solution[]
}

export interface Option {
  value: string
  label: string
}

export interface Solution {
  id: string
  nome: string
  descricao: string
  arquivo: string
  tipoRenderizacao: string
  notificacao?: string
  ativo: boolean
  padrao: boolean
  ordem: number
  permissoes: Permissions[]
  escolas: Schools[]
  slug: string
  link?: string
  category?: Option
}

export interface PostSolutionData {
  nome: string
  descricao: string
  arquivo: string
  link: string
  idCategoria: string
  tipoRenderizacao: string
  ordem?: number
  padrao: boolean
}

export interface PutSolutionData
  extends Omit<Solution, 'permissoes' | 'escolas'> {
  idCategoria: string
  padrao: boolean
}

export interface SolutionPutResponse {
  sucesso: boolean
  mensagem: string
}

export interface DeleteResponse {
  sucesso: boolean
  mensagem: string
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

export interface ReorderSolution {
  id: string
  ordem: number
}
