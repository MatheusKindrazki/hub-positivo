export interface AuthRequest {
  product: string
  url: string
  integration_type?: 'wordpress'
}

export interface AuthReducer {
  loading: boolean
}
