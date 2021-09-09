import { Action } from 'redux'

import { AuthRequest, AuthSuccess } from './types'

type ActionTypes =
  | 'AUTH_PRODUCT_EEM_REQUEST'
  | 'AUTH_PRODUCT_GUID_REQUEST'
  | 'MICRO_FRONTEND_REQUEST'

export const Actions = {
  AUTH_PRODUCT_GUID_REQUEST: '@auth/AUTH_PRODUCT_GUID_REQUEST',
  AUTH_PRODUCT_EEM_REQUEST: '@auth/AUTH_PRODUCT_EEM_REQUEST',

  AUTH_PRODUCT_REQUEST: '@auth/AUTH_PRODUCT_REQUEST',
  AUTH_PRODUCT_SUCCESS: '@auth/AUTH_PRODUCT_SUCCESS',
  AUTH_PRODUCT_FAILURE: '@auth/AUTH_PRODUCT_FAILURE',

  MICRO_FRONTEND_REQUEST: '@auth/MICRO_FRONTEND_REQUEST',
  MICRO_FRONTEND_SUCCESS: '@auth/MICRO_FRONTEND_SUCCESS',
  MICRO_FRONTEND_FAILURE: '@auth/MICRO_FRONTEND_FAILURE',

  SIGN_OUT: '@auth/SIGN_OUT'
}

export function preAuth(data: AuthRequest): Action {
  return {
    type: Actions.AUTH_PRODUCT_REQUEST,
    payload: data
  }
}

export function authProductRequest(
  data: AuthRequest,
  type: ActionTypes
): Action {
  return {
    type: Actions[type],
    payload: data
  }
}

export function authProductSuccess(data: AuthSuccess): Action {
  return {
    type: Actions.AUTH_PRODUCT_SUCCESS,
    payload: data
  }
}

export function authProductFailure(): Action {
  return {
    type: Actions.AUTH_PRODUCT_FAILURE
  }
}
