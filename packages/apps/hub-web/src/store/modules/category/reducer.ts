import { produce } from 'immer'

import { Reducer } from 'redux'

import { CategoryReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: CategoryReducer = {
  loading: true,
  categories: []
}

type ReturnReducer = Reducer<CategoryReducer>

const products: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.CATEGORY_GETALL_REQUEST: {
        draft.loading = true
        draft.categories = []
        break
      }
      case Actions.CATEGORY_GETALL_SUCCESS: {
        draft.loading = false
        draft.categories = action.payload
        break
      }
      case Actions.CATEGORY_GETALL_FAILURE: {
        draft.loading = false
        break
      }
      default:
    }
  })
}

export default products
