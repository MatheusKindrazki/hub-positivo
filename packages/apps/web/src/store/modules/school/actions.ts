import { Action } from 'redux'

import { School } from './types'

export const Actions = {
  SCHOOL_GETALL_REQUEST: '@school/SCHOOL_GETALL_REQUEST',
  SCHOOL_GETALL_SUCCESS: '@school/SCHOOL_GETALL_SUCCESS',
  SCHOOL_GETALL_FAILURE: '@school/SCHOOL_GETALL_FAILURE'
}

export function schoolGetAllRequest(): Action {
  return {
    type: Actions.SCHOOL_GETALL_REQUEST
  }
}

export function schoolGetAllFailure(): Action {
  return {
    type: Actions.SCHOOL_GETALL_FAILURE
  }
}

export function schoolGetAllSuccess(schools: School[]): Action {
  return {
    type: Actions.SCHOOL_GETALL_SUCCESS,
    payload: schools
  }
}
