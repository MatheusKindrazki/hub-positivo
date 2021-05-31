import { Action } from 'redux'

import { ProductRequest, ProductReducer } from './types'

export const Actions = {
  PRODUCT_REQUEST: '@products/PRODUCT_REQUEST',
  PRODUCT_SUCCESS: '@products/PRODUCT_SUCCESS',
  PRODUCT_FAILURE: '@products/PRODUCT_FAILURE',

  WITHOUT_ACCESS: '@auth/WITHOUT_ACCESS',
  PRODUCT_INTEGRATION: '@products/PRODUCT_INTEGRATION',

  SIGN_OUT: '@auth/SIGN_OUT',

  REHYDRATE: 'persist/REHYDRATE'
}

/*
  ? Buscando produtos
*/
export function productRequest(data: ProductRequest): Action {
  return {
    type: Actions.PRODUCT_REQUEST,
    payload: data
  }
}

export function productSuccess(data: Omit<ProductReducer, 'loading'>): Action {
  return {
    type: Actions.PRODUCT_SUCCESS,
    payload: data
  }
}

export function productIntegration(data: ProductReducer['data']): Action {
  return {
    type: Actions.PRODUCT_INTEGRATION,
    payload: data
  }
}
export function productFailure(): Action {
  return {
    type: Actions.PRODUCT_FAILURE
  }
}
