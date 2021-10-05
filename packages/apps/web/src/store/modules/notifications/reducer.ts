import { produce } from 'immer'

import { Reducer } from 'redux'

import { NotificationReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: NotificationReducer = {
  loading: false,
  history: undefined
}

type ReturnReducer = Reducer<NotificationReducer>

const notifications: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.GET_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.GET_SUCCESS: {
        draft.loading = false
        draft.history = action.payload
        break
      }

      case Actions.GET_FAILURE: {
        draft.loading = false
        draft.history = undefined
        break
      }

      default:
    }
  })
}

export default notifications
