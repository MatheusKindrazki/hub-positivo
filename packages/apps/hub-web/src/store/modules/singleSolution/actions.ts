import { Action } from 'redux'

import {
  GetSolutionBySlugPayload,
  PostSolutionPayload,
  Solution
} from './types'

export const Actions = {
  SOLUTION_GET_REQUEST: '@solution/SOLUTION_GET_REQUEST',
  SOLUTION_GET_SUCCESS: '@solution/SOLUTION_GET_SUCCESS',
  SOLUTION_GET_FAILURE: '@solution/SOLUTION_GET_FAILURE',
  SOLUTION_POST_REQUEST: '@solution/SOLUTION_POST_REQUEST',
  SOLUTION_POST_SUCCESS: '@solution/SOLUTION_POST_SUCCESS',
  SOLUTION_POST_FAILURE: '@solution/SOLUTION_POST_FAILURE',
  SOLUTION_DELETE_REQUEST: '@solution/SOLUTION_DELETE_REQUEST',
  SOLUTION_DELETE_SUCCESS: '@solution/SOLUTION_DELETE_SUCCESS',
  SOLUTION_DELETE_FAILURE: '@solution/SOLUTION_DELETE_FAILURE'
}

export function solutionGetRequest({
  slug,
  profile,
  educationalLevel
}: GetSolutionBySlugPayload): Action {
  return {
    type: Actions.SOLUTION_GET_REQUEST,
    payload: {
      slug,
      profile,
      educationalLevel
    }
  }
}

export function solutionGetFailure(): Action {
  return {
    type: Actions.SOLUTION_GET_FAILURE
  }
}

export function solutionGetSuccess(solution: Solution): Action {
  return {
    type: Actions.SOLUTION_GET_SUCCESS,
    payload: {
      solution
    }
  }
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
