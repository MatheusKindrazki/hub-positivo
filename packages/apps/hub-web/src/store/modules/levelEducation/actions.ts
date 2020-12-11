import { Action } from 'redux'

import { SetLevelSuccess } from './types'

export const Actions = {
  SET_LEVEL: '@education/SET_LEVEL',
  RESET_LEVEL: '@education/RESET_LEVEL',

  GET_LEVEL_REQUEST: '@education/GET_LEVEL_REQUEST',
  GET_LEVEL_SUCCESS: '@education/GET_LEVEL_SUCCESS'
}

export function setLevel(level: string): Action {
  return {
    type: Actions.SET_LEVEL,
    payload: level
  }
}

export function resetProfileLevels(): Action {
  return {
    type: Actions.RESET_LEVEL
  }
}

export function setProfileLevels(data: SetLevelSuccess): Action {
  return {
    type: Actions.GET_LEVEL_SUCCESS,
    payload: data
  }
}
