import { produce } from 'immer'

import { Reducer } from 'redux'

import { AcceptTermsState } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: AcceptTermsState = {
  loading: false,
  accepted: false,
  checking: false
}

type ReturnReducer = Reducer<AcceptTermsState>

const acceptTerms: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.TERMS_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.TERMS_SUCCESS: {
        draft.loading = false
        draft.accepted = true
        break
      }

      case Actions.TERMS_FAILURE: {
        draft.loading = false
        draft.accepted = true
        break
      }
      default:
    }
  })
}

export default acceptTerms
