import { UserReducer } from './modules/user/types'
import { TourReducer } from './modules/tour/types'
import { SolutionsReducer } from './modules/solutions/types'
import { SchoolReducer } from './modules/school/types'
import { ProfileReducer } from './modules/profile/types'
import { ProductReducer } from './modules/products/types'
import { PermissionsReducer } from './modules/permissions/types'
import { ClassesReducer } from './modules/myClasses/types'
import { GlobalReducer } from './modules/global/types'
import { ForgotPasswordReducer } from './modules/forgotPassword/types'
import { EducationReducer } from './modules/educationalStage/types'
import { CategoryReducer } from './modules/category/types'
import { AuthReducer as AuthProductReducer } from './modules/authProduct/types'
import { AuthReducer } from './modules/auth/types'
interface ApplicationState {
  auth: AuthReducer
  profile: ProfileReducer
  global: GlobalReducer
  products: ProductReducer
  user: UserReducer
  educationalStage: EducationReducer
  authProduct: AuthProductReducer
  tour: TourReducer
  myClasses: ClassesReducer
  forgotPassword: ForgotPasswordReducer
  solutions: SolutionsReducer
  category: CategoryReducer
  school: SchoolReducer
  permissions: PermissionsReducer
}
declare global {
  declare namespace Store {
    type State = ApplicationState
  }
}
