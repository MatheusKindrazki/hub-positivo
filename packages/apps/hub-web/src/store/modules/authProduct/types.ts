export interface AuthRequest {
  product: string
  url: string
  tipoRenderizacao?: string
}

export interface AuthReducer {
  loading: boolean
}
