import { all } from 'redux-saga/effects'

import auth from './auth/sagas'
import authProduct from './authProduct/sagas'
import products from './products/sagas'

export default function* rootSaga(): Generator {
  return yield all([auth, products, authProduct])
}
