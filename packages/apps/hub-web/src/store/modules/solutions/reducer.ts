import { produce } from 'immer'

import { Reducer } from 'redux'

import { SolutionsReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: SolutionsReducer = {
  loading: true,
  data: []
}

type ReturnReducer = Reducer<SolutionsReducer>

const categories: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SOLUTIONS_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.SOLUTIONS_SUCCESS: {
        draft.loading = false
        draft.data = action.payload
        break
      }

      case Actions.SOLUTIONS_FAILURE: {
        draft.loading = false
        draft.data = undefined
        break
      }

      default:
    }
  })
}

export default categories
