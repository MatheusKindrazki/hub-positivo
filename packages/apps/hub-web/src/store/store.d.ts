import { UserReducer } from './modules/user/types'
import { TourReducer } from './modules/tour/types'
import { SolutionsReducer } from './modules/solutions/types'
import { ProfileReducer } from './modules/profile/types'
import { ProductReducer } from './modules/products/types'
import { ClassesReducer } from './modules/myClasses/types'
import { GlobalReducer } from './modules/global/types'
import { ForgotPasswordReducer } from './modules/forgotPassword/types'
import { EducationReducer } from './modules/educationalStage/types'
import { CategoriesReducer } from './modules/categories/types'
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
  categories: CategoriesReducer
  solutions: SolutionsReducer
}
declare global {
  declare namespace Store {
    type State = ApplicationState
  }
}
