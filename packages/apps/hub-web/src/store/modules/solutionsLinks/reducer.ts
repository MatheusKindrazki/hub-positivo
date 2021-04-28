import { produce } from 'immer'

import { Reducer } from 'redux'

import { SolutionsLinksReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: SolutionsLinksReducer = {
  loading: true,
  data: []
}

type ReturnReducer = Reducer<SolutionsLinksReducer>

const categories: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SOLUTIONS_LINKS_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.SOLUTIONS_LINKS_SUCCESS: {
        draft.loading = false
        draft.data = action.payload
        break
      }

      case Actions.SOLUTIONS_LINKS_FAILURE: {
        draft.loading = false
        draft.data = []
        break
      }

      default:
    }
  })
}

export default categories
