import { Action } from 'redux'

import { ClassesAPI } from './types'

export const Actions = {
  GET_REQUEST: '@classes/GET_REQUEST',
  GET_SUCCESS: '@classes/GET_SUCCESS',
  GET_FAILURE: '@classes/GET_FAILURE'
}

export function classesRequest(): Action {
  return {
    type: Actions.GET_REQUEST
  }
}

export function classesSuccess(data?: ClassesAPI[]): Action {
  return {
    type: Actions.GET_SUCCESS,
    payload: data
  }
}

export function classesFailure(): Action {
  return {
    type: Actions.GET_FAILURE
  }
}
