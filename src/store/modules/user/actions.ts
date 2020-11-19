import { Action } from 'redux';

import { Schools } from './types';

export const Actions = {
  USER_REQUEST: '@user/USER_REQUEST',
  USER_SUCCESS: '@user/USER_SUCCESS',
  USER_FAILURE: '@user/USER_FAILURE',

  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',

  SET_SCHOOL: '@user/SET_SCHOOL',
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

export function setSchool(data: Schools): Action {
  return {
    type: Actions.SET_SCHOOL,
    payload: data,
  };
}
