export interface PwdTokenRequest {
  userInfo: string
}

export interface ForgotPasswordReducer {
  loading: boolean
  validatePin: boolean
  validateViewPin: boolean
}

export interface PwdTokenApi {
  error: boolean
  errorMessage?: string
}
export interface ValidatePin {
  pin: string
}
export interface ValidatePinAPI {
  error: boolean
  content: boolean
}
