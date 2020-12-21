import { Action } from 'redux'

import { PwdTokenRequest } from './types'

export const Actions = {
  PWD_TOKEN_REQUEST: '@auth/PWD_TOKEN_REQUEST',
  PWD_TOKEN_SUCCESS: '@auth/PWD_TOKEN_SUCCESS',
  PWD_TOKEN_FAILURE: '@auth/PWD_TOKEN_FAILURE'
}

export function pwdTokenRequest(data: PwdTokenRequest): Action {
  return {
    type: Actions.PWD_TOKEN_REQUEST,
    payload: data
  }
}

export function pwdTokenSuccess(): Action {
  return {
    type: Actions.PWD_TOKEN_SUCCESS
  }
}

export function pwdTokenFailure(): Action {
  return {
    type: Actions.PWD_TOKEN_FAILURE
  }
}
