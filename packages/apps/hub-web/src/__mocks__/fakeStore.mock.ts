import { routerMiddleware } from 'connected-react-router'

import createSagaMiddleware from 'redux-saga'
import configureStore, { MockStore } from 'redux-mock-store'

import { INITIAL_STATE as user } from '~/store/modules/user/reducer'
import { INITIAL_STATE as tour } from '~/store/modules/tour/reducer'
import { INITIAL_STATE as profile } from '~/store/modules/profile/reducer'
import { INITIAL_STATE as products } from '~/store/modules/products/reducer'
import { INITIAL_STATE as myClasses } from '~/store/modules/myClasses/reducer'
import { INITIAL_STATE as global } from '~/store/modules/global/reducer'
import { INITIAL_STATE as forgotPassword } from '~/store/modules/forgotPassword/reducer'
import { INITIAL_STATE as educationalStage } from '~/store/modules/educationalStage/reducer'
import { INITIAL_STATE as authProduct } from '~/store/modules/authProduct/reducer'
import { INITIAL_STATE as auth } from '~/store/modules/auth/reducer'
import { store as trueStore } from '~/store'

import history from '~/services/history'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const mockStore = configureStore(middlewares)

export const mockState = {
  auth,
  user,
  profile,
  products,
  global,
  educationalStage,
  tour,
  authProduct,
  forgotPassword,
  myClasses
}

const store = mockStore(mockState) as MockStore<Store.State>

beforeEach(() => {
  jest.spyOn(trueStore, 'getState').mockImplementation(() => store.getState())
  jest.spyOn(trueStore, 'dispatch').mockImplementation(store.dispatch)
})

export default store
