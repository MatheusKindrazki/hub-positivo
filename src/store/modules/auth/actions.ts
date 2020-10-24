import { Action } from 'redux';

import { SignInRequest } from './types';

export const Actions = {
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: '@auth/SIGN_IN_FAILURE',

  SIGN_OUT: '@auth/SIGN_OUT',
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
