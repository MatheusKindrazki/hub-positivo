import { Action } from 'redux'

import { ProductRequest, ProductReducer } from './types'

export const Actions = {
  PRODUCT_REQUEST: '@products/PRODUCT_REQUEST',
  PRODUCT_SUCCESS: '@products/PRODUCT_SUCCESS',
  PRODUCT_FAILURE: '@products/PRODUCT_FAILURE',

  SIGN_OUT: '@auth/SIGN_OUT',

  PRODUCT_INTEGRATION: '@products/PRODUCT_INTEGRATION',

  FRAME_URL: '@products/FRAME_URL',

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

export function productFailure(): Action {
  return {
    type: Actions.PRODUCT_FAILURE
  }
}

export function productIntegration(data: ProductReducer['data']): Action {
  return {
    type: Actions.PRODUCT_INTEGRATION,
    payload: data
  }
}

export function setFrameURL({
  url,
  name
}: {
  url: string
  name: string
}): Action {
  return {
    type: Actions.FRAME_URL,
    payload: { url, name }
  }
}
