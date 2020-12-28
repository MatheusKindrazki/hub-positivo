import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import { AuthReducer } from './types'

export const INITIAL_STATE: AuthReducer = {
  signed: false,
  loading: false,
  token: null,
  auth_time: 0,
  iat: 0,
  exp: 0
}

type ReturnReducer = Reducer<AuthReducer>

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SIGN_IN_REQUEST: {
        draft.signed = false
        draft.loading = true
        break
      }

      case Actions.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token
        draft.auth_time = action.payload.auth_time
        draft.iat = action.payload.iat
        draft.exp = action.payload.exp

        draft.loading = false
        break
      }

      case Actions.SIGN_IN_FAILURE: {
        draft.signed = false
        draft.token = null
        draft.auth_time = 0
        draft.iat = 0
        draft.exp = 0
        draft.loading = false
        break
      }
      case Actions.SET_SIGNED: {
        draft.signed = true
        break
      }

      case Actions.SIGN_OUT: {
        draft.signed = false
        draft.token = null
        draft.auth_time = 0
        draft.iat = 0
        draft.exp = 0
        draft.loading = false
        break
      }
      default:
    }
  })
}

export default auth
