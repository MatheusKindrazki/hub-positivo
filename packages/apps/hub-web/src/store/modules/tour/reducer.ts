import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import mockStep from './stepsProf'
import { TourReducer } from './types'

const INITIAL_STATE: TourReducer = {
  loading: false,
  open: false,
  viewed: false,
  steps: mockStep
}

type Tour = Reducer<TourReducer>

const tour: Tour = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.GET_INFO_VIEWED_REQUEST: {
        draft.loading = true

        break
      }

      case Actions.GET_INFO_VIEWED_SUCCESS: {
        draft.loading = false
        draft.open = !action.payload.viewed
        draft.viewed = action.payload.viewed

        break
      }

      case Actions.GET_INFO_VIEWED_FAILURE: {
        draft.loading = false

        break
      }
    }
  })
}

export default tour
