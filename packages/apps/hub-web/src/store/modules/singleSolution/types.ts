export interface Solution {
  id: string
  nome: string
  descricao: string
  arquivo: string
  link?: string
  idCategoria: string
  ativo: boolean
  tipoRenderizacao: string
  slug?: string
  dataExclusao: string
  ordem: number
  excluida: boolean
}

export interface SolutionReducer {
  loading: boolean
  solution: Solution | null
}

export interface GetSolutionBySlugPayload {
  slug: string
  profile: string
  educationalLevel: string
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
  extends Omit<Solution, 'dataExclusao' | 'excluida'> {
  padrao: boolean
}
export interface SolutionPutResponse {
  sucesso: boolean
  mensagem: string
}
