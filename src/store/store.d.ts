import { AuthReducer } from './modules/auth/types';
import { GlobalReducer } from './modules/global/types';
import { EducationReducer } from './modules/levelEducation/types';
import { ProductReducer } from './modules/products/types';
import { ProfileReducer } from './modules/profile/types';
import { UserReducer } from './modules/user/types';

interface ApplicationState {
  auth: AuthReducer;
  profile: ProfileReducer;
  global: GlobalReducer;
  products: ProductReducer;
  user: UserReducer;
  levelEducation: EducationReducer;
}
declare global {
  declare namespace Store {
    type State = ApplicationState;
  }
}
