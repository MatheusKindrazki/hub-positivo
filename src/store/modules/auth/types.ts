export interface SignInRequest {
  username: string;
  password: string;
}

export interface AuthReducer {
  signed: boolean;
  loading: boolean;
  token: string | null;
  auth_time: number;
  iat: number;
}

export interface AuthApi {
  access_token: string;
  expires_in: string;
  token_type: string;
}

export interface SignInSuccess {
  token: string | null;
  auth_time: number | null;
  iat: number | null;
  user?: {
    name: string | null;
    schools?: Schools[];
    email: string | null;
  };
}
interface Schools {
  id: string;
  name: string;
  roles: Roles[];
}

interface Roles {
  name: string;
}
