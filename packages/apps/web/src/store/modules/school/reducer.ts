import { produce } from 'immer'

import { Reducer } from 'redux'

import { SchoolReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: SchoolReducer = {
  loading: true,
  schools: []
}

type ReturnReducer = Reducer<SchoolReducer>

const school: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SCHOOL_GETALL_REQUEST: {
        draft.loading = true
        draft.schools = []
        break
      }
      case Actions.SCHOOL_GETALL_SUCCESS: {
        draft.loading = false
        draft.schools = action.payload
        break
      }
      case Actions.SCHOOL_GETALL_FAILURE: {
        draft.loading = false
        break
      }
      default:
    }
  })
}

export default school
