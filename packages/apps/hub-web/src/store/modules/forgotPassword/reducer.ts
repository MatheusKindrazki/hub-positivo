import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import { ForgotPasswordReducer } from './types'

export const INITIAL_STATE: ForgotPasswordReducer = {
  loading: false,
  validatePin: false,
  validateViewPin: false
}

type ReturnReducer = Reducer<ForgotPasswordReducer>

const forgotPassword: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.PWD_TOKEN_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.PWD_TOKEN_SUCCESS: {
        draft.loading = false
        break
      }

      case Actions.PWD_TOKEN_FAILURE: {
        draft.loading = false
        break
      }

      case Actions.VALIDATE_PIN_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.VALIDATE_PIN_SUCCESS: {
        draft.loading = false
        draft.validatePin = action.payload
        draft.validateViewPin = true
        break
      }

      case Actions.VALIDATE_PIN_FAILURE: {
        draft.loading = false
        break
      }
      default:
    }
  })
}

export default forgotPassword
