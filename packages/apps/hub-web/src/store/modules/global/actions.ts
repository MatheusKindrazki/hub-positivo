import { Action } from 'redux'

export const Actions = {
  LOADING: '@global/LOADING',

  MODAL: '@global/MODAL'
}

export function loading(status: boolean): Action {
  return {
    type: Actions.LOADING,
    payload: status
  }
}
