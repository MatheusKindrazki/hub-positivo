import { Action } from 'redux'

export const Actions = {
  LOADING: '@global/LOADING',

  ENABLE_REFRESH_TOKEN: '@global/ENABLE_REFRESH_TOKEN',

  MODAL: '@global/MODAL'
}

export function loading(status: boolean): Action {
  return {
    type: Actions.LOADING,
    payload: status
  }
}

export function enableRefreshTokenMiddleware(enable: boolean): Action {
  return {
    type: Actions.ENABLE_REFRESH_TOKEN,
    payload: enable
  }
}
