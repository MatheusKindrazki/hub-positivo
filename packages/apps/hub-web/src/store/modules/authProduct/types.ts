export interface AuthRequest {
  product: string
  name: string
  url: string
  tipoRenderizacao?: string
  subpath?: string
}

export interface AuthReducer {
  loading: boolean
}
