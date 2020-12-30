import { Action } from 'redux'

import { Schools, UserAlterPass, UserAlterPassPanel } from './types'

export const Actions = {
  USER_REQUEST: '@user/USER_REQUEST',
  USER_SUCCESS: '@user/USER_SUCCESS',
  USER_FAILURE: '@user/USER_FAILURE',

  USER_PASSWORD_REQUEST: '@user/USER_PASSWORD_REQUEST',
  USER_PASSWORD_SUCCESS: '@user/USER_PASSWORD_SUCCESS',
  USER_PASSWORD_FAILURE: '@user/USER_PASSWORD_FAILURE',

  USER_PASSWORD_PANEL_REQUEST: '@user/ USER_PASSWORD_PANEL_REQUEST',
  USER_PASSWORD_PANEL_SUCCESS: '@user/ USER_PASSWORD_PANEL_SUCCESS',
  USER_PASSWORD_PANEL_FAILURE: '@user/ USER_PASSWORD_PANEL_FAILURE',

  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',

  SET_SCHOOL: '@user/SET_SCHOOL'
}

/* Prepara informações do usuário logado */
export function userRequest(): Action {
  return {
    type: Actions.USER_REQUEST
  }
}

export function userSuccess(): Action {
  return {
    type: Actions.USER_SUCCESS
  }
}

export function userFailure(): Action {
  return {
    type: Actions.USER_FAILURE
  }
}
/* Seta a escola do usuário */
export function setSchool(data: Schools): Action {
  return {
    type: Actions.SET_SCHOOL,
    payload: data
  }
}

/*  Alteração de senha do usuário em caso de esquecimento */
export function forgotPasswordRequest(data: UserAlterPass): Action {
  return {
    type: Actions.USER_PASSWORD_REQUEST,
    payload: data
  }
}

export function forgotPasswordSuccess(): Action {
  return {
    type: Actions.USER_PASSWORD_SUCCESS
  }
}

export function forgotPasswordFailure(): Action {
  return {
    type: Actions.USER_PASSWORD_FAILURE
  }
}

/*  Alteração de senha do usuário */
export function alterPasswordRequest(data: UserAlterPassPanel): Action {
  return {
    type: Actions.USER_PASSWORD_PANEL_REQUEST,
    payload: data
  }
}

export function alterPasswordSuccess(): Action {
  return {
    type: Actions.USER_PASSWORD_PANEL_SUCCESS
  }
}

export function alterPasswordFailure(): Action {
  return {
    type: Actions.USER_PASSWORD_PANEL_FAILURE
  }
}
