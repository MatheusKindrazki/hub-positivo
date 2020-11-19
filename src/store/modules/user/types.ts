export interface UserReducer {
  loading: boolean;
  user?: User;
  avatar: string;
}

export interface User {
  name: string | null;
  schools?: Schools[];
  email: string | null;
}

interface Schools {
  id: string;
  name: string;
  roles: string[];
}
