import { Action } from 'redux'

import { noBreak } from '~/services/mixpanel/noBreak'

export const Actions = {
  NO_BREAK_ENABLE: '@nobreak/ENABLE',
  NO_BREAK_DISABLE: '@nobreak/DISABLE'
}

interface NoBreakInfo {
  user_login: string
}

export function noBreakAccessEnable(data: NoBreakInfo): Action {
  noBreak({
    type: 'No Break Activated',
    user_login: data.user_login
  })
  return {
    type: Actions.NO_BREAK_ENABLE,
    payload: data
  }
}

export function noBreakAccessDisable(data: NoBreakInfo): Action {
  noBreak({
    type: 'No Break Closed',
    user_login: data.user_login
  })
  return {
    type: Actions.NO_BREAK_DISABLE,
    payload: data
  }
}
