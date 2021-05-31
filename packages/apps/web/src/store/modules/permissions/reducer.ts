import { produce } from 'immer'

import { Reducer } from 'redux'

import { PermissionsReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: PermissionsReducer = {
  loading: true,
  schoolPermissions: [],
  profilePermissions: [],
  profileOptions: []
}

type ReturnReducer = Reducer<PermissionsReducer>

const permissions: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.GETALL_PROFILE_PERMISSIONS_REQUEST: {
        draft.loading = true
        break
      }
      case Actions.GETALL_PROFILE_PERMISSIONS_SUCCESS: {
        draft.loading = false
        draft.profileOptions = action.payload
        break
      }
      case Actions.GETALL_PROFILE_PERMISSIONS_FAILURE: {
        draft.loading = false
        break
      }
      case Actions.PROFILE_PERMISSIONS_BYID_REQUEST: {
        draft.loading = true
        draft.profilePermissions = []
        break
      }
      case Actions.PROFILE_PERMISSIONS_BYID_SUCCESS: {
        draft.loading = false
        draft.profilePermissions = action.payload
        break
      }
      case Actions.PROFILE_PERMISSIONS_BYID_FAILURE: {
        draft.loading = false
        break
      }
      case Actions.SCHOOL_PERMISSIONS_BYID_REQUEST: {
        draft.loading = true
        draft.schoolPermissions = []
        break
      }
      case Actions.SCHOOL_PERMISSIONS_BYID_SUCCESS: {
        draft.loading = false
        draft.schoolPermissions = action.payload
        break
      }
      case Actions.SCHOOL_PERMISSIONS_BYID_FAILURE: {
        draft.loading = false
        break
      }
    }
  })
}

export default permissions
