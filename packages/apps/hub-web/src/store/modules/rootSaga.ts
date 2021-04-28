import { all } from 'redux-saga/effects'

import user from './user/sagas'
import tour from './tour/sagas'
import solutions from './solutions/sagas'
import products from './products/sagas'
import productIntegrations from './productIntegrations/sagas'
import myClasses from './myClasses/sagas'
import forgotPassword from './forgotPassword/sagas'
import educationalStage from './educationalStage/sagas'
import categories from './categories/sagas'
import authProduct from './authProduct/sagas'
import auth from './auth/sagas'

export default function* rootSaga(): Generator {
  return yield all([
    auth,
    user,
    authProduct,
    forgotPassword,
    educationalStage,
    productIntegrations,
    myClasses,
    products,
    tour,
    categories,
    solutions
  ])
}
