import { produce } from 'immer'

import { Reducer } from 'redux'

import { ProductReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: ProductReducer = {
  loading: true,
  data: []
}

type ReturnReducer = Reducer<ProductReducer>

const products: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.WITHOUT_ACCESS:
      case Actions.PRODUCT_REQUEST: {
        draft.loading = true
        draft.data = []
        break
      }

      case Actions.PRODUCT_SUCCESS: {
        draft.loading = false
        draft.data = action.payload.data
        break
      }

      case Actions.PRODUCT_INTEGRATION: {
        draft.data = action.payload
        break
      }

      case Actions.PRODUCT_FAILURE: {
        draft.loading = false
        draft.data = []
        break
      }

      case Actions.SIGN_OUT: {
        draft.data = []
        draft.loading = true
        break
      }
      default:
    }
  })
}

export default products
