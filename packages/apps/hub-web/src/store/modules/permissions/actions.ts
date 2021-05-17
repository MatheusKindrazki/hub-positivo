import { Action } from 'redux'

import {
  SchoolPermissions,
  ProfilePermissions,
  ProfileLevelsBySolution,
  SchoolsRestrictionsBySolution
} from './types'

export const Actions = {
  PROFILE_PERMISSIONS_REQUEST: '@permissions/PROFILE_PERMISSION_REQUEST',
  PROFILE_PERMISSIONS_SUCCESS: '@permissions/PROFILE_PERMISSION_SUCCESS',
  PROFILE_PERMISSIONS_FAILURE: '@permissions/PROFILE_PERMISSION_FAILURE',

  PROFILE_PERMISSIONS_BYID_REQUEST:
    '@permissions/PROFILE_PERMISSION_BYID_REQUEST',
  PROFILE_PERMISSIONS_BYID_SUCCESS:
    '@permissions/PROFILE_PERMISSION_BYID_SUCCESS',
  PROFILE_PERMISSIONS_BYID_FAILURE:
    '@permissions/PROFILE_PERMISSION_BYID_FAILURE',

  SCHOOL_PERMISSIONS_REQUEST: '@permissions/SCHOOL_PERMISSION_REQUEST',
  SCHOOL_PERMISSIONS_SUCCESS: '@permissions/SCHOOL_PERMISSION_SUCCESS',
  SCHOOL_PERMISSIONS_FAILURE: '@permissions/SCHOOL_PERMISSION_FAILURE',

  SCHOOL_PERMISSIONS_BYID_REQUEST:
    '@permissions/SCHOOL_PERMISSION_BYID_REQUEST',
  SCHOOL_PERMISSIONS_BYID_SUCCESS:
    '@permissions/SCHOOL_PERMISSION_BYID_SUCCESS',
  SCHOOL_PERMISSIONS_BYID_FAILURE: '@permissions/SCHOOL_PERMISSION_BYID_FAILURE'
}

// ? Actions de request dos dados de permissao por perfil/nivel de ensino

export const profilePermissionsRequest = (
  permissions: ProfilePermissions
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
  permissions: SchoolPermissions
): Action => {
  return {
    type: Actions.SCHOOL_PERMISSIONS_REQUEST,
    payload: permissions
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

// ? Actions que disparam ações referentes às permissoes dos perfis por solução

export const profilePermissionsBySolutionRequest = (id: string): Action => {
  return {
    type: Actions.PROFILE_PERMISSIONS_BYID_REQUEST,
    payload: {
      id
    }
  }
}

export const profilePermissionsBySolutionFailure = (): Action => {
  return {
    type: Actions.PROFILE_PERMISSIONS_BYID_FAILURE
  }
}

export const profilePermissionsBySolutionSuccess = (
  data: ProfileLevelsBySolution[]
): Action => {
  return {
    type: Actions.PROFILE_PERMISSIONS_BYID_SUCCESS,
    payload: data
  }
}

// ? Actions que disparam ações referentes às restricoes das escolas por solução
export const schoolRestrictionsBySolutionRequest = (id: string): Action => {
  return {
    type: Actions.SCHOOL_PERMISSIONS_BYID_REQUEST,
    payload: {
      id
    }
  }
}

export const schoolPermissionsBySolutionFailure = (): Action => {
  return {
    type: Actions.SCHOOL_PERMISSIONS_BYID_FAILURE
  }
}

export const schoolPermissionsBySolutionSuccess = (
  data: SchoolsRestrictionsBySolution[]
): Action => {
  return {
    type: Actions.SCHOOL_PERMISSIONS_BYID_SUCCESS,
    payload: data
  }
}
