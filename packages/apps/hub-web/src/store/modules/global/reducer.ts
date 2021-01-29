import { produce } from 'immer'

import { Reducer } from 'redux'

import { GlobalReducer } from './types'
import { Actions } from './actions'

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
