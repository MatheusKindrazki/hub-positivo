/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'react'

import { History } from 'history'
import { connectRouter } from 'connected-react-router'

import { AnyAction, CombinedState, combineReducers } from 'redux'

import user from './user/reducer'
import tour from './tour/reducer'
import profile from './profile/reducer'
import products from './products/reducer'
import myClasses from './myClasses/reducer'
import global from './global/reducer'
import forgotPassword from './forgotPassword/reducer'
import educationalStage from './educationalStage/reducer'
import authProduct from './authProduct/reducer'
import auth from './auth/reducer'

export const reducerArray = {
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

export default (history: History): Reducer<CombinedState<any>, AnyAction> => {
  return combineReducers({
    ...reducerArray,
    router: connectRouter(history)
  })
}
