import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put } from 'redux-saga/effects'
import { Action } from 'redux'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import {
  GenericApiResponse,
  ProfileLevelsBySolution,
  SchoolsRestrictionsBySolution,
  ProfilePermissionApiData
} from './types'
import {
  Actions,
  profilePermissionsSuccess,
  profilePermissionsFailure,
  schoolPermissionsSuccess,
  schoolPermissionsFailure,
  schoolPermissionsBySolutionFailure,
  schoolPermissionsBySolutionSuccess,
  profilePermissionsBySolutionFailure,
  profilePermissionsBySolutionSuccess,
  getAllProfilePermissionsFailure,
  getAllProfilePermissionsSuccess
} from './actions'

export function* getAllProfilePermissions(): Generator {
  const response = yield call(() => {
    return api.get('perfilNivelEnsino')
  })

  const { ok, data } = response as ApiResponse<ProfilePermissionApiData[]>

  if (!ok) {
    toast.error('Erro ao buscar permissoes de perfil!')
    return yield put(getAllProfilePermissionsFailure())
  }
  return yield put(
    getAllProfilePermissionsSuccess(data as ProfilePermissionApiData[])
  )
}

export function* profilePermissions(action: Action): Generator {
  const { create, remove } = action.payload

  if (
    !remove.IdsPerfisNiveisEnsino?.length &&
    !create.IdsPerfisNiveisEnsino?.length
  ) {
    return
  }

  if (remove.IdsPerfisNiveisEnsino?.length) {
    const removeResponse = yield call(() => {
      return api.delete('solucaoPerfilNivelEnsino', {}, { data: remove })
    })

    const { ok: removeOk } = removeResponse as ApiResponse<GenericApiResponse>

    if (!removeOk) {
      toast.error('Erro ao atualizar permissões de perfil')
      return yield put(profilePermissionsFailure())
    }
  }

  if (create.IdsPerfisNiveisEnsino?.length) {
    const createResponse = yield call(() => {
      return api.post('solucaoPerfilNivelEnsino', {
        ...create
      })
    })

    const { ok: createOk } = createResponse as ApiResponse<GenericApiResponse>
    if (!createOk) {
      toast.error('Erro ao atualizar permissões de perfil')
      return yield put(profilePermissionsFailure())
    }
  }

  return yield put(profilePermissionsSuccess())
}

export function* schoolPermissions(action: Action): Generator {
  const { create, remove } = action.payload

  if (!remove.idsEscolas?.length && !create.idsEscolas?.length) return

  // Remove permissoes interrompendo o fluxo caso haja algum erro
  if (remove.idsEscolas?.length) {
    const deleteResponse = yield call(() => {
      return api.delete('solucao/Restricao', {}, { data: remove })
    })

    const { ok: removeOk } = deleteResponse as ApiResponse<GenericApiResponse>

    if (!removeOk) {
      toast.error('Algo deu errado no momento de atualizar permissões')
      return yield put(schoolPermissionsFailure())
    }

    yield put(schoolPermissionsSuccess())
  }

  // Cria permissoes interrompendo o fluxo caso haja algum erro
  if (create.idsEscolas?.length) {
    const postResponse = yield call(() => {
      return api.post('solucao/restricao', {
        ...create
      })
    })

    const { ok: createOk } = postResponse as ApiResponse<GenericApiResponse>
    if (!createOk) {
      toast.error('Algo deu errado no momento de atualizar restrições')
      return yield put(schoolPermissionsFailure())
    }
  }

  return yield put(schoolPermissionsSuccess())
}

export function* getProfilePermissionsBySolutionId(action: Action): Generator {
  const response = yield call(() => {
    return api.get('solucaoPerfilNivelEnsino', {
      idSolucao: action.payload.id
    })
  })

  const { ok, data } = response as ApiResponse<ProfileLevelsBySolution[]>

  if (!ok) {
    toast.error('Erro ao buscar restrições de perfil desta solução')
    return yield put(profilePermissionsBySolutionFailure())
  }

  return yield put(
    profilePermissionsBySolutionSuccess(data as ProfileLevelsBySolution[])
  )
}

export function* getSchoolPermissionsBySolutionId(action: Action): Generator {
  const response = yield call(() => {
    return api.get('solucao/restricao', { idSolucao: action.payload.id })
  })

  const { ok, data } = response as ApiResponse<SchoolsRestrictionsBySolution[]>

  if (!ok) {
    toast.error('Erro ao buscar permissões de escola para esta solucao')
    return yield put(schoolPermissionsBySolutionFailure())
  }
  return yield put(
    schoolPermissionsBySolutionSuccess(data as SchoolsRestrictionsBySolution[])
  )
}

export default all([
  takeLatest(Actions.PROFILE_PERMISSIONS_REQUEST, profilePermissions),
  takeLatest(Actions.SCHOOL_PERMISSIONS_REQUEST, schoolPermissions),
  takeLatest(
    Actions.GETALL_PROFILE_PERMISSIONS_REQUEST,
    getAllProfilePermissions
  ),
  takeLatest(
    Actions.PROFILE_PERMISSIONS_BYID_REQUEST,
    getProfilePermissionsBySolutionId
  ),
  takeLatest(
    Actions.SCHOOL_PERMISSIONS_BYID_REQUEST,
    getSchoolPermissionsBySolutionId
  )
])