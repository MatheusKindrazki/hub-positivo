import { Action } from 'redux';

export const Actions = {
  USER_REQUEST: '@auth/USER_REQUEST',
  USER_SUCCESS: '@auth/USER_SUCCESS',
  USER_FAILURE: '@auth/USER_FAILURE',

  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
};

export function userRequest(): Action {
  return {
    type: Actions.USER_REQUEST,
  };
}

export function userSuccess(): Action {
  return {
    type: Actions.USER_SUCCESS,
  };
}

export function userFailure(): Action {
  return {
    type: Actions.USER_FAILURE,
  };
}
