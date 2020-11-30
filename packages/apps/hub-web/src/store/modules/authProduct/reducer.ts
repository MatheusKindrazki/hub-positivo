import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import { AuthReducer } from './types'

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
