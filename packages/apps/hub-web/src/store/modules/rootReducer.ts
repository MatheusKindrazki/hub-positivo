/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'react'

import { AnyAction, CombinedState, combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import auth from './auth/reducer'
import authProduct from './authProduct/reducer'
import global from './global/reducer'
import levelEducation from './levelEducation/reducer'
import products from './products/reducer'
import profile from './profile/reducer'
import tour from './tour/reducer'
import user from './user/reducer'

export default (history: History): Reducer<CombinedState<any>, AnyAction> => {
  return combineReducers({
    auth,
    user,
    tour,
    profile,
    products,
    global,
    levelEducation,
    authProduct,
    router: connectRouter(history)
  })
}
