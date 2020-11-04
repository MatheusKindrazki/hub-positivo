import { AuthReducer } from './modules/auth/types';
import { GlobalReducer } from './modules/global/types';
import { ProfileReducer } from './modules/profile/types';

interface ApplicationState {
  auth: AuthReducer;
  profile: ProfileReducer;
  global: GlobalReducer;
}
declare global {
  declare namespace Store {
    type State = ApplicationState;
  }
}
