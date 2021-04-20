import { produce } from 'immer'

import { Reducer } from 'redux'

import { AuthReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: AuthReducer = {
  loading: false,
  mcf: true,
  productName: null,
  productData: null
}

type ReturnReducer = Reducer<AuthReducer>

const authProduct: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.AUTH_PRODUCT_REQUEST: {
        draft.loading = true
        draft.mcf = false
        break
      }

      case Actions.AUTH_PRODUCT_SUCCESS: {
        draft.loading = false
        draft.mcf = action?.payload?.mcf || false
        draft.productData = action?.payload?.productData || null
        draft.productName = action?.payload?.productName || null
        break
      }

      case Actions.AUTH_PRODUCT_FAILURE: {
        draft.loading = false
        draft.mcf = false
        break
      }
      default:
    }
  })
}

export default authProduct
