import { produce } from 'immer'

import { Reducer } from 'redux'

import { removeChatbot } from '@psdhub/chatbot'

import { UserReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: UserReducer = {
  loading: false,
  avatar: '',
  school: undefined
}

type ReturnReducer = Reducer<UserReducer>

const user: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SIGN_IN_SUCCESS: {
        delete action.payload.token
        delete action.payload.iat
        delete action.payload.auth_time

        draft.info = action.payload.info
        draft.loading = false
        break
      }

      case Actions.SET_SCHOOL: {
        draft.school = action.payload
        break
      }

      case Actions.USER_PASSWORD_REQUEST: {
        draft.loading = true
        break
      }
      case Actions.USER_PASSWORD_SUCCESS: {
        draft.loading = false
        break
      }
      case Actions.USER_PASSWORD_FAILURE: {
        draft.loading = false
        break
      }

      case Actions.USER_PASSWORD_PANEL_REQUEST: {
        draft.loading = true
        break
      }
      case Actions.USER_PASSWORD_PANEL_SUCCESS: {
        draft.loading = false
        break
      }
      case Actions.USER_PASSWORD_PANEL_FAILURE: {
        draft.loading = false
        break
      }
      case Actions.SIGN_OUT: {
        draft.info = undefined
        draft.school = undefined

        removeChatbot()
        break
      }
      default:
    }
  })
}

export default user
