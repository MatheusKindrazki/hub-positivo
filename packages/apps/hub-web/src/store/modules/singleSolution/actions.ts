import { Action } from 'redux'

import { PostSolutionPayload } from './types'

export const Actions = {
  SOLUTION_POST_REQUEST: '@solution/SOLUTION_POST_REQUEST',
  SOLUTION_POST_SUCCESS: '@solution/SOLUTION_POST_SUCCESS',
  SOLUTION_POST_FAILURE: '@solution/SOLUTION_POST_FAILURE',
  SOLUTION_DELETE_REQUEST: '@solution/SOLUTION_DELETE_REQUEST',
  SOLUTION_DELETE_SUCCESS: '@solution/SOLUTION_DELETE_SUCCESS',
  SOLUTION_DELETE_FAILURE: '@solution/SOLUTION_DELETE_FAILURE'
}

export function solutionPostRequest(solution: PostSolutionPayload): Action {
  return {
    type: Actions.SOLUTION_POST_REQUEST,
    payload: {
      solution
    }
  }
}

export function solutionPostFailure(): Action {
  return {
    type: Actions.SOLUTION_POST_FAILURE
  }
}

export function solutionPostSuccess(): Action {
  return {
    type: Actions.SOLUTION_POST_SUCCESS
  }
}

export function solutionDeleteRequest(id: string): Action {
  return {
    type: Actions.SOLUTION_DELETE_REQUEST,
    payload: {
      id
    }
  }
}

export function solutionDeleteFailure(): Action {
  return {
    type: Actions.SOLUTION_DELETE_FAILURE
  }
}

export function solutionDeleteSuccess(): Action {
  return {
    type: Actions.SOLUTION_DELETE_SUCCESS
  }
}
