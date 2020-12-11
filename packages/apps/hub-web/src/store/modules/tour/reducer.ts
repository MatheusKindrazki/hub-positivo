import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import { TourReducer } from './types'

export const INITIAL_STATE: TourReducer = {
  open: false,
  viewed: false
}

type ReturnReducer = Reducer<TourReducer>

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.OPEN: {
        draft.open = action.payload
        break
      }
      default:
    }
  })
}

export default auth
