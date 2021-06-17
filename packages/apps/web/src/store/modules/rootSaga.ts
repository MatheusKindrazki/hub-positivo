import { all } from 'redux-saga/effects'

import user from './user/sagas'
import tour from './tour/sagas'
import solutions from './solutions/sagas'
import school from './school/sagas'
import products from './products/sagas'
import productIntegrations from './productIntegrations/sagas'
import permissions from './permissions/sagas'
import myClasses from './myClasses/sagas'
import forgotPassword from './forgotPassword/sagas'
import educationalStage from './educationalStage/sagas'
import category from './category/sagas'
import authProduct from './authProduct/sagas'
import auth from './auth/sagas'
import accessControl from './accessControl/sagas'

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
    solutions,
    category,
    school,
    permissions,
    accessControl
  ])
}