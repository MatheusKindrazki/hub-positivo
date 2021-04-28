export interface SolutionsLinksReducer {
  loading: boolean
  data?: SolutionLinksAPI[]
}

export interface SolutionLinksAPI {
  id: string
  idSolucao: string
  idPerfilNivelEnsino: string
}
