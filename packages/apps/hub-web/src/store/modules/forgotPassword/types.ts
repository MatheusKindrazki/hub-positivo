export interface PwdTokenRequest {
  userInfo: string
}

export interface ForgotPasswordReducer {
  loading: boolean
}

export interface PwdTokenApi {
  error: boolean
  errorMessage?: string
}
