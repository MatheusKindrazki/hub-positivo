import { Action } from 'redux'

export const Actions = {
  OPEN: '@tour/OPEN'
}

export function openTour(open: boolean): Action {
  return {
    type: Actions.OPEN,
    payload: open
  }
}
