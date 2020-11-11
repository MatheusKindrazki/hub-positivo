import { Action } from 'redux';

import { ProductRequest, ProductReducer } from './types';

export const Actions = {
  PRODUCT_REQUEST: '@auth/PRODUCT_REQUEST',
  PRODUCT_SUCCESS: '@auth/PRODUCT_SUCCESS',
  PRODUCT_FAILURE: '@auth/PRODUCT_FAILURE',
};

/*
  ? Buscando produtos
*/
export function productRequest(data: ProductRequest): Action {
  return {
    type: Actions.PRODUCT_REQUEST,
    payload: data,
  };
}

export function productSuccess(data: Omit<ProductReducer, 'loading'>): Action {
  return {
    type: Actions.PRODUCT_SUCCESS,
    payload: data,
  };
}

export function productFailure(): Action {
  return {
    type: Actions.PRODUCT_FAILURE,
  };
}
