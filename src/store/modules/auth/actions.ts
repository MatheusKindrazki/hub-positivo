import { Action } from 'redux';

import { SignInRequest, SignInSuccess } from './types';

export const Actions = {
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: '@auth/SIGN_IN_FAILURE',

  SIGN_OUT: '@auth/SIGN_OUT',

  SET_PROFILE_REQUEST: '@auth/SET_PROFILE_REQUEST',

  SET_SIGNED: '@auth/SET_SIGNED',
};

/*
  Autenticação na aplicação
*/
export function signInRequest(data: SignInRequest): Action {
  return {
    type: Actions.SIGN_IN_REQUEST,
    payload: data,
  };
}

export function signInSuccess(data: SignInSuccess): Action {
  return {
    type: Actions.SIGN_IN_SUCCESS,
    payload: data,
  };
}

export function signInFailure(): Action {
  return {
    type: Actions.SIGN_IN_FAILURE,
  };
}

export function setSigned(): Action {
  return {
    type: Actions.SET_SIGNED,
  };
}

export function signOut(): Action {
  return {
    type: Actions.SIGN_OUT,
  };
}
