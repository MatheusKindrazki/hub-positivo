import { produce } from 'immer'

import { Reducer } from 'redux'

import { AuthReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: AuthReducer = {
  loading: false
}

type ReturnReducer = Reducer<AuthReducer>

const authProduct: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.AUTH_PRODUCT_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.AUTH_PRODUCT_SUCCESS: {
        draft.loading = false
        break
      }

      case Actions.AUTH_PRODUCT_FAILURE: {
        draft.loading = false
        break
      }
      default:
    }
  })
}

export default authProduct
