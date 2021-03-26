import { produce } from 'immer'

import { Reducer } from 'redux'

import { TourReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: TourReducer = {
  loading: false,
  open: false,
  viewed: false,
  viewedLoaded: false,
  steps: undefined
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
        draft.viewedLoaded = true
        draft.open = !action.payload.viewed
        draft.viewed = action.payload.viewed

        break
      }

      case Actions.GET_INFO_VIEWED_FAILURE: {
        draft.loading = false

        break
      }

      case Actions.OPEN_TOUR: {
        draft.open = action.payload.open

        break
      }

      case Actions.SIGN_OUT: {
        draft.loading = false
        draft.open = false
        draft.viewed = false
        draft.viewedLoaded = false
        draft.steps = undefined

        break
      }

      case Actions.GET_TOUR_SUCCESS: {
        draft.steps = action.payload

        break
      }
    }
  })
}

export default tour
