import { Action } from 'redux'

import { Solution } from './types'

export const Actions = {
  SOLUTION_UPDATE_REQUEST: '@solution/SOLUTION_UPDATE_REQUEST',
  SOLUTION_UPDATE_SUCCESS: '@solution/SOLUTION_UPDATE_SUCCESS',
  SOLUTION_UPDATE_FAILURE: '@solution/SOLUTION_UPDATE_FAILURE'
}

export function solutionUpdateRequest(data: Solution): Action {
  return {
    type: Actions.SOLUTION_UPDATE_REQUEST,
    payload: data
  }
}

export function solutionUpdateFailure(): Action {
  return {
    type: Actions.SOLUTION_UPDATE_FAILURE
  }
}

export function solutionUpdateSuccess(): Action {
  return {
    type: Actions.SOLUTION_UPDATE_SUCCESS
  }
}
