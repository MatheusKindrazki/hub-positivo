import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import { EducationReducer } from './types'

export const INITIAL_STATE: EducationReducer = {
  loading: false,
  level: '',
  levels: undefined
}

type ReturnReducer = Reducer<EducationReducer>

const global: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SET_LEVEL: {
        draft.level = action.payload
        break
      }

      case Actions.SIGN_OUT: {
        draft.level = ''
        draft.levels = undefined
        break
      }

      case Actions.RESET_LEVEL: {
        draft.loading = false
        draft.level = ''
        draft.levels = undefined
        break
      }

      case Actions.GET_LEVEL_SUCCESS: {
        draft.level = action.payload.level
        draft.levels = action.payload.levels
        break
      }
      default:
    }
  })
}

export default global
