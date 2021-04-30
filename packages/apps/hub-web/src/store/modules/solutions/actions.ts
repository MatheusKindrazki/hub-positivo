import { Action } from 'redux'

import { Solutions } from './types'

export const Actions = {
  SOLUTIONS_REQUEST: '@solutions/SOLUTIONS_REQUEST',
  SOLUTIONS_SUCCESS: '@solutions/SOLUTIONS_SUCCESS',
  SOLUTIONS_FAILURE: '@solutions/SOLUTIONS_FAILURE'
}

/*
  ? Buscando todas as categorias e soluções
*/

export function solutionsRequest(): Action {
  return {
    type: Actions.SOLUTIONS_REQUEST
  }
}

export function solutionsFailure(): Action {
  return {
    type: Actions.SOLUTIONS_FAILURE
  }
}

export function solutionsSuccess(data?: Solutions[]): Action {
  return {
    type: Actions.SOLUTIONS_SUCCESS,
    payload: data
  }
}
