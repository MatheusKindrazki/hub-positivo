export interface SolutionsReducer {
  loading: boolean
  data?: Category[]
  excludedSolutions?: Category[]
}
export interface Category {
  id: string
  ordem: number
  ativo: boolean
  nome: string
  cor?: string
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

export interface PostSolutionPayload {
  nome: string
  descricao: string
  arquivo: string
  link: string
  idCategoria: string
  idProduto: string
  tipoRenderizacao: string
  ordem: number
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

// export interface GetExcludedSolutionsResponse
//   extends Omit<Solution, 'permissoes' | 'escolas'> {
//   excluido: boolean
// }
