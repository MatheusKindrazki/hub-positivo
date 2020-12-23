import { all } from 'redux-saga/effects'

import auth from './auth/sagas'
import authProduct from './authProduct/sagas'
import forgotPassword from './forgotPassword/sagas'
import levelEducation from './levelEducation/sagas'
import products from './products/sagas'
import tour from './tour/sagas'

export default function* rootSaga(): Generator {
  return yield all([
    auth,
    authProduct,
    forgotPassword,
    levelEducation,
    products,
    tour
  ])
}
