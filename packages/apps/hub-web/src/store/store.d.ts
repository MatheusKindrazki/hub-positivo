import { AuthReducer } from './modules/auth/types'
import { AuthReducer as AuthProductReducer } from './modules/authProduct/types'
import { ForgotPasswordReducer } from './modules/forgotPassword/types'
import { GlobalReducer } from './modules/global/types'
import { EducationReducer } from './modules/levelEducation/types'
import { ProductReducer } from './modules/products/types'
import { ProfileReducer } from './modules/profile/types'
import { TourReducer } from './modules/tour/types'
import { UserReducer } from './modules/user/types'

interface ApplicationState {
  auth: AuthReducer
  profile: ProfileReducer
  global: GlobalReducer
  products: ProductReducer
  user: UserReducer
  levelEducation: EducationReducer
  authProduct: AuthProductReducer
  tour: TourReducer
  forgotPassword: ForgotPasswordReducer
}
declare global {
  declare namespace Store {
    type State = ApplicationState
  }
}
