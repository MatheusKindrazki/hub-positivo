import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import { GlobalReducer } from './types'

export const INITIAL_STATE: GlobalReducer = {
  loading: false
}

type ReturnReducer = Reducer<GlobalReducer>

const global: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.LOADING: {
        draft.loading = action.payload
        break
      }
      default:
    }
  })
}

export default global
