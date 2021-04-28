import { produce } from 'immer'

import { Reducer } from 'redux'

import { CategoriesReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: CategoriesReducer = {
  loading: true,
  categories: []
}

type ReturnReducer = Reducer<CategoriesReducer>

const categories: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.CATEGORIES_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.CATEGORIES_SUCCESS: {
        draft.loading = false
        draft.categories = action.payload
        break
      }

      case Actions.CATEGORIES_FAILURE: {
        draft.loading = false
        draft.categories = undefined
        break
      }

      default:
    }
  })
}

export default categories
