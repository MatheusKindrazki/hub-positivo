import { Action } from 'redux'

import { NotificationHistory, PutNotificationData } from './types'

export const Actions = {
  GET_REQUEST: '@notifications/GET_REQUEST',
  GET_SUCCESS: '@notifications/GET_SUCCESS',
  GET_FAILURE: '@notifications/GET_FAILURE',

  PUT_REQUEST: '@notifications/PUT_REQUEST',
  PUT_SUCCESS: '@notifications/PUT_SUCCESS',
  PUT_FAILURE: '@notifications/PUT_FAILURE'
}

export function notificationsRequest(): Action {
  return {
    type: Actions.GET_REQUEST
  }
}

export function notificationsSuccess(history?: NotificationHistory): Action {
  return {
    type: Actions.GET_SUCCESS,
    payload: history
  }
}

export function notificationsFailure(): Action {
  return {
    type: Actions.GET_FAILURE
  }
}

export function notificationPutRequest(
  notificationData: PutNotificationData
): Action {
  return {
    type: Actions.PUT_REQUEST,
    payload: notificationData
  }
}

export function notificationPutSuccess(): Action {
  return {
    type: Actions.PUT_SUCCESS
  }
}

export function notificationPutFailure(): Action {
  return {
    type: Actions.PUT_FAILURE
  }
}
