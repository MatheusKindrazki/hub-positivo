export interface SignInRequest {
  username: string;
  password: string;
}

export interface AuthReducer {
  signed: boolean;
  selectProfile: boolean;
  loading: boolean;
  avatar: string;
}

export interface AuthApi {
  access_token: string;
  expires_in: string;
  token_type: string;
}
