import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import dataLoading from './mock'
import { ProductReducer } from './types'

export const INITIAL_STATE: ProductReducer = {
  loading: false,
  data: (dataLoading as unknown) as ProductReducer['data']
}

type ReturnReducer = Reducer<ProductReducer>

const products: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.PRODUCT_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.PRODUCT_SUCCESS: {
        draft.loading = false
        draft.data = action.payload.data
        break
      }

      case Actions.PRODUCT_FAILURE: {
        draft.loading = false
        break
      }

      case Actions.FRAME_URL: {
        draft.frameUrl = action.payload
        break
      }
      default:
    }
  })
}

export default products
