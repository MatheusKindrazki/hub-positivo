import { Action } from 'redux'

import { notificationHistory } from './types'

export const Actions = {
  GET_REQUEST: '@notifications/GET_REQUEST',
  GET_SUCCESS: '@notifications/GET_SUCCESS',
  GET_FAILURE: '@notifications/GET_FAILURE'
}

export function notificationsRequest(): Action {
  return {
    type: Actions.GET_REQUEST
  }
}

export function notificationsSuccess(data?: notificationHistory[]): Action {
  return {
    type: Actions.GET_SUCCESS,
    payload: data
  }
}

export function notificationsFailure(): Action {
  return {
    type: Actions.GET_FAILURE
  }
}
