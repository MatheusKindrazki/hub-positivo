import { Action } from 'redux'

import { ProfilePermissionData, SchoolPermissionData } from './types'

export const Actions = {
  PROFILE_PERMISSIONS_REQUEST: '@permissions/PROFILE_PERMISSION_REQUEST',
  PROFILE_PERMISSIONS_SUCCESS: '@permissions/PROFILE_PERMISSION_SUCCESS',
  PROFILE_PERMISSIONS_FAILURE: '@permissions/PROFILE_PERMISSION_FAILURE',

  SCHOOL_PERMISSIONS_REQUEST: '@permissions/SCHOOL_PERMISSION_REQUEST',
  SCHOOL_PERMISSIONS_SUCCESS: '@permissions/SCHOOL_PERMISSION_SUCCESS',
  SCHOOL_PERMISSIONS_FAILURE: '@permissions/SCHOOL_PERMISSION_FAILURE'
}

// ? Actions de request dos dados de permissao por perfil/nivel de ensino

export const profilePermissionsRequest = (
  permissions: ProfilePermissionData
): Action => {
  return {
    type: Actions.PROFILE_PERMISSIONS_REQUEST,
    payload: permissions
  }
}

export const profilePermissionsSuccess = (): Action => {
  return {
    type: Actions.PROFILE_PERMISSIONS_SUCCESS
  }
}

export const profilePermissionsFailure = (): Action => {
  return {
    type: Actions.PROFILE_PERMISSIONS_FAILURE
  }
}

// ? Actions que disparam ações referentes às permissoes das escolas

export const schoolPermissionsRequest = (
  permissions: SchoolPermissionData
): Action => {
  return {
    type: Actions.SCHOOL_PERMISSIONS_REQUEST,
    payload: {
      permissions
    }
  }
}

export const schoolPermissionsSuccess = (): Action => {
  return {
    type: Actions.SCHOOL_PERMISSIONS_SUCCESS
  }
}

export const schoolPermissionsFailure = (): Action => {
  return {
    type: Actions.SCHOOL_PERMISSIONS_FAILURE
  }
}
