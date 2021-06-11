import { produce } from 'immer'

import { Reducer } from 'redux'

import { ClassesReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: ClassesReducer = {
  loading: false,
  classes: undefined
}

type ReturnReducer = Reducer<ClassesReducer>

const myClasses: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.GET_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.GET_SUCCESS: {
        draft.loading = false
        draft.classes = action.payload
        break
      }

      case Actions.GET_FAILURE: {
        draft.loading = false
        draft.classes = undefined
        break
      }

      default:
    }
  })
}

export default myClasses
