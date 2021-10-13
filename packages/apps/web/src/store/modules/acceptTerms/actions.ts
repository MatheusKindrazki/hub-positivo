import { Action } from 'redux'

export const TERM_VERSION = '1.0.0'

export const Actions = {
  TERMS_REQUEST: '@acceptTerms/TERMS_REQUEST',
  TERMS_SUCCESS: '@acceptTerms/TERMS_SUCCESS',
  TERMS_FAILURE: '@acceptTerms/TERMS_FAILURE',

  CHECK_TERMS_REQUEST: '@acceptTerms/TERMS_REQUEST',
  CHECK_TERMS_SUCCESS: '@acceptTerms/TERMS_SUCCESS',
  CHECK_TERMS_FAILURE: '@acceptTerms/TERMS_FAILURE'
}

export function checkTermsRequest(): Action {
  return {
    type: Actions.CHECK_TERMS_REQUEST
  }
}

export function checkTermsSuccess(): Action {
  return {
    type: Actions.CHECK_TERMS_SUCCESS
  }
}

export function checkTermsFailure(): Action {
  return {
    type: Actions.CHECK_TERMS_FAILURE
  }
}

export function acceptTermsRequest(): Action {
  return {
    type: Actions.TERMS_REQUEST
  }
}

export function acceptTermsSuccess(): Action {
  return {
    type: Actions.TERMS_SUCCESS
  }
}

export function acceptTermsFailure(): Action {
  return {
    type: Actions.TERMS_FAILURE
  }
}
