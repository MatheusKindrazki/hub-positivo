import { Action } from 'redux'

import { AccessControlPutData, AccessControlPostData } from './types'

export const Actions = {
  ACCESS_CONTROL_POST_REQUEST: '@accessControl/ACCESS_CONTROL_POST_REQUEST',
  ACCESS_CONTROL_POST_SUCCESS: '@accessControl/ACCESS_CONTROL_POST_SUCCESS',
  ACCESS_CONTROL_POST_FAILURE: '@accessControl/ACCESS_CONTROL_POST_FAILURE',

  ACCESS_CONTROL_PUT_REQUEST: '@accessControl/ACCESS_CONTROL_PUT_REQUEST',
  ACCESS_CONTROL_PUT_SUCCESS: '@accessControl/ACCESS_CONTROL_PUT_SUCCESS',
  ACCESS_CONTROL_PUT_FAILURE: '@accessControl/ACCESS_CONTROL_PUT_FAILURE'
}

/*
  ? iniciar fluxo de submissao dos formularios de controle de acessos
*/

export function accessControlPostRequest(
  accessControlData: AccessControlPostData
): Action {
  return {
    type: Actions.ACCESS_CONTROL_POST_REQUEST,
    payload: accessControlData
  }
}

export function accessControlPostFailure(): Action {
  return {
    type: Actions.ACCESS_CONTROL_POST_SUCCESS
  }
}

export function accessControlPostSuccess(): Action {
  return {
    type: Actions.ACCESS_CONTROL_POST_FAILURE
  }
}

export function accessControlPutRequest(
  accessControlData: AccessControlPutData
): Action {
  return {
    type: Actions.ACCESS_CONTROL_PUT_REQUEST,
    payload: accessControlData
  }
}

export function accessControlPutFailure(): Action {
  return {
    type: Actions.ACCESS_CONTROL_PUT_SUCCESS
  }
}

export function accessControlPutSuccess(): Action {
  return {
    type: Actions.ACCESS_CONTROL_PUT_FAILURE
  }
}
