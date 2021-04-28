import { Action } from 'redux'

import { CategoryAPI } from './types'

export const Actions = {
  CATEGORIES_REQUEST: '@category/CATEGORIES_REQUEST',
  CATEGORIES_SUCCESS: '@category/CATEGORIES_SUCCESS',
  CATEGORIES_FAILURE: '@category/CATEGORIES_FAILURE'
}

/*
  ? Buscando categorias
*/

export function categoriesRequest(): Action {
  return {
    type: Actions.CATEGORIES_REQUEST
  }
}

export function categoriesFailure(): Action {
  return {
    type: Actions.CATEGORIES_FAILURE
  }
}

export function categoriesSuccess(data?: CategoryAPI[]): Action {
  return {
    type: Actions.CATEGORIES_SUCCESS,
    payload: data
  }
}
