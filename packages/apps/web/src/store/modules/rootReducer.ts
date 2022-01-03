/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'react'

import { History } from 'history'
import { connectRouter } from 'connected-react-router'

import { AnyAction, CombinedState, combineReducers } from 'redux'

import user from './user/reducer'
import tour from './tour/reducer'
import solutions from './solutions/reducer'
import school from './school/reducer'
import profile from './profile/reducer'
import products from './products/reducer'
import permissions from './permissions/reducer'
import noBreakAccess from './noBreakAccess/reducer'
import myClasses from './myClasses/reducer'
import global from './global/reducer'
import forgotPassword from './forgotPassword/reducer'
import educationalStage from './educationalStage/reducer'
import category from './category/reducer'
import authProduct from './authProduct/reducer'
import auth from './auth/reducer'
import acceptTerms from './acceptTerms/reducer'

export default (history: History): Reducer<CombinedState<any>, AnyAction> => {
  return combineReducers({
    auth,
    user,
    profile,
    products,
    acceptTerms,
    global,
    educationalStage,
    tour,
    authProduct,
    forgotPassword,
    myClasses,
    solutions,
    category,
    school,
    permissions,
    noBreakAccess,
    router: connectRouter(history)
  })
}
