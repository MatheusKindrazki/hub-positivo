import { Action } from 'redux'

import { setEducationalStageSuccess } from './types'

export const Actions = {
  SET_LEVEL: '@education/SET_LEVEL',
  RESET_LEVEL: '@education/RESET_LEVEL',

  GET_LEVEL_REQUEST: '@education/GET_LEVEL_REQUEST',
  GET_LEVEL_SUCCESS: '@education/GET_LEVEL_SUCCESS',

  REFRESH_LEVEL_EDUCATION: '@education/REFRESH_LEVEL_EDUCATION',

  REHYDRATE: 'persist/REHYDRATE',

  SIGN_OUT: '@auth/SIGN_OUT'
}

export function setEducationalStage(level: string): Action {
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

export function setEducationalLevels(data: setEducationalStageSuccess): Action {
  return {
    type: Actions.GET_LEVEL_SUCCESS,
    payload: data
  }
}
