import { AuthReducer } from './modules/auth/types';

interface ApplicationState {
  auth: AuthReducer;
}
declare global {
  declare namespace Store {
    type State = ApplicationState;
  }
}
