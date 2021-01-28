import { Reducer } from 'redux'

import { produce } from 'immer'

import { Actions } from './actions'
import { AuthReducer } from './types'

export const INITIAL_STATE: AuthReducer = {
  exp: 0,
  token: null,
  signed: false,
  loading: false,
  refresh_token: null,
  reduced_token: null,
  signInStrike: false,
  withoutAccess: false
}
type ReturnReducer = Reducer<AuthReducer>

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SIGN_IN_REQUEST: {
        draft.signed = false
        draft.loading = true
        draft.signInStrike = false
        draft.withoutAccess = false

        break
      }

      case Actions.SIGN_IN_SUCCESS: {
        draft.refresh_token = action.payload.refresh_token
        draft.token = action.payload.token
        draft.exp = action.payload.exp
        draft.signInStrike = false
        draft.withoutAccess = false
        draft.loading = false

        break
      }

      case Actions.SIGN_IN_FAILURE: {
        draft.signed = false
        draft.token = null
        draft.refresh_token = null
        draft.reduced_token = null
        draft.exp = 0
        draft.loading = false
        draft.signInStrike = true
        draft.withoutAccess = false

        break
      }

      case Actions.REFRESH_TOKEN_SUCCESS: {
        draft.refresh_token = action.payload.refresh_token
        draft.token = action.payload.token
        draft.exp = action.payload.exp

        break
      }

      case Actions.SET_SIGNED: {
        draft.signed = true
        draft.withoutAccess = false

        break
      }

      case Actions.WITHOUT_ACCESS: {
        draft.withoutAccess = true

        break
      }

      case Actions.REDUCED_TOKEN_EEM: {
        draft.reduced_token = action.payload

        break
      }

      case Actions.SIGN_OUT: {
        draft.signed = false
        draft.token = null
        draft.exp = 0
        draft.loading = false
        draft.refresh_token = null
        draft.reduced_token = null
        draft.withoutAccess = false

        break
      }
      default:
    }
  })
}

export default auth
