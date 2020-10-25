export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthReducer {
  signed: boolean;
  selectProfile: boolean;
  loading: boolean;
}
