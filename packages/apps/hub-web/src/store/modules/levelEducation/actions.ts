import { Action } from 'redux'

export const Actions = {
  SET_LEVEL: '@education/SET_LEVEL'
}

export function setLevel(level: string): Action {
  return {
    type: Actions.SET_LEVEL,
    payload: level
  }
}
