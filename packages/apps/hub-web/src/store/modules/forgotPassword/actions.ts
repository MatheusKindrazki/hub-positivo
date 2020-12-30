import { Action } from 'redux'

import { PwdTokenRequest, ValidatePin } from './types'

export const Actions = {
  PWD_TOKEN_REQUEST: '@auth/PWD_TOKEN_REQUEST',
  PWD_TOKEN_SUCCESS: '@auth/PWD_TOKEN_SUCCESS',
  PWD_TOKEN_FAILURE: '@auth/PWD_TOKEN_FAILURE',

  VALIDATE_PIN_REQUEST: '@auth/VALIDATE_PIN_REQUEST',
  VALIDATE_PIN_SUCCESS: '@auth/VALIDATE_PIN_SUCCESS',
  VALIDATE_PIN_FAILURE: '@auth/VALIDATE_PIN_FAILURE'
}

/*  Envia o token para o usuário ( email, username ou cpf )  */
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

/*  Valida o PIN recebido por query  */
export function validatePinRequest(data: ValidatePin): Action {
  return {
    type: Actions.VALIDATE_PIN_REQUEST,
    payload: data
  }
}

export function validatePinSuccess(valid: boolean): Action {
  return {
    type: Actions.VALIDATE_PIN_SUCCESS,
    payload: valid
  }
}

export function validatePinFailure(): Action {
  return {
    type: Actions.VALIDATE_PIN_FAILURE
  }
}
