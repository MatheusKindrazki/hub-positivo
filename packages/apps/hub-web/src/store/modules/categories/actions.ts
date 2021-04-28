import { Action } from 'redux'

import { CategoriesReducer } from './types'

export const Actions = {
  CATEGORIES_REQUEST: '@categories/CATEGORIES_REQUEST',
  CATEGORIES_LOADING: '@categories/CATEGORIES_LOADING',
  CATEGORIES_SUCCESS: '@categories/CATEGORIES_SUCCESS',
  CATEGORIES_FAILURE: '@categories/CATEGORIES_FAILURE'
}

/*
  ? Buscando categorias
*/
export function categoriesRequest(): Action {
  return {
    type: Actions.CATEGORIES_REQUEST
  }
}

export function categoriesLoading(): Action {
  return {
    type: Actions.CATEGORIES_FAILURE
  }
}
export function categoriesSuccess(
  data: Omit<CategoriesReducer, 'loading'>
): Action {
  return {
    type: Actions.CATEGORIES_SUCCESS,
    payload: data
  }
}

export function categoriesFailure(): Action {
  return {
    type: Actions.CATEGORIES_FAILURE
  }
}
