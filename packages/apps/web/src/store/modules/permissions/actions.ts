import { Action } from 'redux'

import {
  SchoolPermissions,
  ProfilePermissions,
  ProfileLevelsBySolution,
  SchoolsRestrictionsBySolution,
  ProfilePermissionApiData
} from './types'

export const Actions = {
  PROFILE_PERMISSIONS_REQUEST: '@permissions/PROFILE_PERMISSIONS_REQUEST',
  PROFILE_PERMISSIONS_SUCCESS: '@permissions/PROFILE_PERMISSIONS_SUCCESS',
  PROFILE_PERMISSIONS_FAILURE: '@permissions/PROFILE_PERMISSIONS_FAILURE',

  PROFILE_PERMISSIONS_BYID_REQUEST:
    '@permissions/PROFILE_PERMISSIONS_BYID_REQUEST',
  PROFILE_PERMISSIONS_BYID_SUCCESS:
    '@permissions/PROFILE_PERMISSIONS_BYID_SUCCESS',
  PROFILE_PERMISSIONS_BYID_FAILURE:
    '@permissions/PROFILE_PERMISSIONS_BYID_FAILURE',

  GETALL_PROFILE_PERMISSIONS_REQUEST:
    '@permissions/GETALL_PROFILE_PERMISSIONS_REQUEST',
  GETALL_PROFILE_PERMISSIONS_SUCCESS:
    '@permissions/GETALL_PROFILE_PERMISSIONS_SUCCESS',
  GETALL_PROFILE_PERMISSIONS_FAILURE:
    '@permissions/GETALL_PROFILE_PERMISSIONS_FAILURE',

  SCHOOL_PERMISSIONS_REQUEST: '@permissions/SCHOOL_PERMISSIONS_REQUEST',
  SCHOOL_PERMISSIONS_SUCCESS: '@permissions/SCHOOL_PERMISSIONS_SUCCESS',
  SCHOOL_PERMISSIONS_FAILURE: '@permissions/SCHOOL_PERMISSIONS_FAILURE',

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

// ? Actions que buscam todos os dados de perfis e niveis de ensino

export const getAllProfilePermissionsRequest = (): Action => {
  return {
    type: Actions.GETALL_PROFILE_PERMISSIONS_REQUEST
  }
}

export const getAllProfilePermissionsSuccess = (
  data: ProfilePermissionApiData[]
): Action => {
  return {
    type: Actions.GETALL_PROFILE_PERMISSIONS_SUCCESS,
    payload: data
  }
}

export const getAllProfilePermissionsFailure = (): Action => {
  return {
    type: Actions.GETALL_PROFILE_PERMISSIONS_FAILURE
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
export const schoolPermissionsBySolutionRequest = (id: string): Action => {
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
