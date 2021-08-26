import { produce } from 'immer'

import { Reducer } from 'redux'

import { NoBreakReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: NoBreakReducer = {
  nobreak: false,
  user_login: undefined
}

type Tour = Reducer<NoBreakReducer>

const noBreakAccess: Tour = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.NO_BREAK_ENABLE: {
        draft.nobreak = true
        draft.user_login = action.payload.user_login

        break
      }

      case Actions.NO_BREAK_DISABLE: {
        draft.nobreak = false
        draft.user_login = undefined

        break
      }
    }
  })
}

export default noBreakAccess
