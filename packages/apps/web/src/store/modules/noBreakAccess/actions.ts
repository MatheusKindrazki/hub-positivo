import { Action } from 'redux'

export const Actions = {
  NO_BREAK_ENABLE: '@nobreak/ENABLE',
  NO_BREAK_DISABLE: '@nobreak/DISABLE'
}

export function noBreakAccessEnable(): Action {
  return {
    type: Actions.NO_BREAK_ENABLE
  }
}

export function noBreakAccessDisable(): Action {
  return {
    type: Actions.NO_BREAK_DISABLE
  }
}
