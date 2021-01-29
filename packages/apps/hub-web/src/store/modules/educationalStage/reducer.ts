import { produce } from 'immer'

import { Reducer } from 'redux'

import { EducationReducer } from './types'
import { Actions } from './actions'

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
        draft.loading = false
        break
      }

      case Actions.REFRESH_LEVEL_EDUCATION: {
        draft.loading = true
        break
      }

      case Actions.SIGN_OUT: {
        draft.loading = false
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
        draft.loading = false
        break
      }

      default:
    }
  })
}

export default global
