import { all } from 'redux-saga/effects'

import user from './user/sagas'
import tour from './tour/sagas'
import products from './products/sagas'
import productIntegrations from './productIntegrations/sagas'
import forgotPassword from './forgotPassword/sagas'
import educationalStage from './educationalStage/sagas'
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
    products,
    tour
  ])
}
