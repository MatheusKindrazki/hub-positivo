export interface AuthRequest {
  product: string
  name: string
  url: string
  tipoRenderizacao?: string
}

export interface AuthReducer {
  loading: boolean
}
