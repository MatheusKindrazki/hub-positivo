import { Action } from 'redux'

import { SolutionLinksAPI } from './types'

export const Actions = {
  SOLUTIONS_LINKS_REQUEST: '@solutionsLink/SOLUTIONS_LINKS_REQUEST',
  SOLUTIONS_LINKS_SUCCESS: '@solutionsLink/SOLUTIONS_LINKS_SUCCESS',
  SOLUTIONS_LINKS_FAILURE: '@solutionsLink/SOLUTIONS_LINKS_FAILURE'
}

/*
  ? Buscando todos os vínculos das soluções com os perfis e níveis ensino
*/

export function solutionsLinksRequest(): Action {
  return {
    type: Actions.SOLUTIONS_LINKS_REQUEST
  }
}

export function solutionsLinksFailure(): Action {
  return {
    type: Actions.SOLUTIONS_LINKS_FAILURE
  }
}

export function solutionsLinksSuccess(data?: SolutionLinksAPI[]): Action {
  return {
    type: Actions.SOLUTIONS_LINKS_SUCCESS,
    payload: data
  }
}
