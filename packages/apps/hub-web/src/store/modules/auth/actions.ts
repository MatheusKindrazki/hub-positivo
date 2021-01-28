import { Action } from 'redux'

import { SignInRequest, SignInSuccess, RefreshToken } from './types'

export const Actions = {
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: '@auth/SIGN_IN_FAILURE',

  WITHOUT_ACCESS: '@auth/WITHOUT_ACCESS',

  SIGN_OUT: '@auth/SIGN_OUT',

  SET_PROFILE_REQUEST: '@auth/SET_PROFILE_REQUEST',

  SET_SIGNED: '@auth/SET_SIGNED',

  REFRESH_TOKEN_REQUEST: '@auth/REFRESH_TOKEN_REQUEST',
  REFRESH_TOKEN_SUCCESS: '@auth/REFRESH_TOKEN_SUCCESS',

  REDUCED_TOKEN_EEM: '@auth/REDUCED_TOKEN_EEM',

  REHYDRATE: 'persist/REHYDRATE'
}

/*
  Autenticação na aplicação
*/
export function signInRequest(data: SignInRequest): Action {
  return {
    type: Actions.SIGN_IN_REQUEST,
    payload: data
  }
}

export function signInSuccess(data: SignInSuccess): Action {
  return {
    type: Actions.SIGN_IN_SUCCESS,
    payload: data
  }
}

export function signInFailure(): Action {
  return {
    type: Actions.SIGN_IN_FAILURE
  }
}

/*
  Autoriza usuário a entrar
*/
export function setSigned(): Action {
  return {
    type: Actions.SET_SIGNED
  }
}

/*
  Caso o usuário não possua nivelEnsino
*/
export function withoutAccess(): Action {
  return {
    type: Actions.WITHOUT_ACCESS
  }
}

export function signOut(): Action {
  return {
    type: Actions.SIGN_OUT
  }
}

/*
  Atualiza o token do usuário
*/
export function refreshTokenRequest(): Action {
  return {
    type: Actions.REFRESH_TOKEN_REQUEST
  }
}

export function refreshTokenSuccess(data: RefreshToken): Action {
  return {
    type: Actions.REFRESH_TOKEN_SUCCESS,
    payload: data
  }
}

/*
  Recebe token secundário para autenticação na EEM
*/
export function reducedTokenEEM(token: string): Action {
  return {
    type: Actions.REDUCED_TOKEN_EEM,
    payload: token
  }
}
