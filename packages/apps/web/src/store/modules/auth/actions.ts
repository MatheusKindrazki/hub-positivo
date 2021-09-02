import { Action } from 'redux'

import clearMixPanelSession from '~/services/mixpanel/clearAll'

import { SignInRequest, SignInSuccess, RefreshToken, AccessData } from './types'

export const Actions = {
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: '@auth/SIGN_IN_FAILURE',
  SIGN_IN_REQUEST_LOADING: '@auth/SIGN_IN_REQUEST_LOADING',

  FIRST_ACCESS: '@auth/FIRST_ACCESS',

  SET_PROFILE_REQUEST: '@auth/SET_PROFILE_REQUEST',

  REFRESH_TOKEN_REQUEST: '@auth/REFRESH_TOKEN_REQUEST',
  REFRESH_TOKEN_SUCCESS: '@auth/REFRESH_TOKEN_SUCCESS',

  WITHOUT_ACCESS: '@auth/WITHOUT_ACCESS',

  SET_SIGNED: '@auth/SET_SIGNED',

  SIGN_OUT: '@auth/SIGN_OUT',

  RESET_LOADING: '@auth/RESET_LOADING',

  REDUCED_TOKEN_EEM: '@auth/REDUCED_TOKEN_EEM',

  REHYDRATE: 'persist/REHYDRATE'
}

/*
  Autenticação na aplicação
*/
export function signInRequestLoading(): Action {
  return {
    type: Actions.SIGN_IN_REQUEST_LOADING
  }
}

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

export function resetLoading(): Action {
  return {
    type: Actions.RESET_LOADING
  }
}
/*
  Realiza Setup inicial do usuário
*/

export function preparingUserData(data: AccessData): Action {
  return {
    type: Actions.FIRST_ACCESS,
    payload: data
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

/*
  Des-loga o usuário
*/
export function signOut(): Action {
  clearMixPanelSession()
  return {
    type: Actions.SIGN_OUT
  }
}
