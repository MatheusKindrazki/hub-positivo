import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put, Payload } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'

import api from '@psdhub/api'

import {
  GenericApiResponse,
  ProfilePermissions,
  SchoolPermissions
} from './types'
import {
  Actions,
  profilePermissionsSuccess,
  schoolPermissionsSuccess,
  profilePermissionsFailure,
  schoolPermissionsFailure
} from './actions'

type UpdateProfilePayload = Payload<ProfilePermissions>

export function* profilePermissions({
  payload
}: UpdateProfilePayload): Generator {
  console.log('profilePermissions', payload)
  const { create, remove } = payload

  if (remove.idsPerfilNivelDeEnsino?.length) {
    const removeResponse = yield call(() => {
      return api.delete('SolucaoPerfilNivelEnsino', {
        ...remove
      })
    })

    const { ok: removeOk } = removeResponse as ApiResponse<any>

    if (!removeOk) {
      throw new Error('Erro ao deletar permissões')
    }
  }

  if (create.idsPerfilNivelDeEnsino?.length) {
    const createResponse = yield call(() => {
      return api.post('SolucaoPerfilNivelEnsino', {
        ...create
      })
    })

    const { ok: createOk } = createResponse as ApiResponse<any>

    if (!createOk) {
      put(profilePermissionsFailure())
      throw new Error('Erro ao criar permissões')
    }
    yield put(profilePermissionsSuccess())
  }
}

type SchoolPermissionsPayload = Payload<SchoolPermissions>

export function* schoolPermissions({
  payload
}: SchoolPermissionsPayload): Generator {
  console.log('schoolPermissions', payload)
  const { create, remove } = payload

  // Remove permissoes interrompendo o fluxo caso haja algum erro
  yield put(loading(true))

  if (remove.idsEscolas?.length) {
    const deleteResponse = yield call(() => {
      return api.delete('Solucao/Restricao', {
        ...remove
      })
    })

    const { ok: removeOk } = deleteResponse as ApiResponse<GenericApiResponse>

    yield put(loading(false))

    if (!removeOk) {
      put(schoolPermissionsFailure())
      throw new Error('Erro ao deletar permissões')
    }

    yield put(schoolPermissionsSuccess())
  }

  // Cria permissoes interrompendo o fluxo caso haja algum erro
  yield put(loading(true))

  if (create.idsEscolas?.length) {
    const postResponse = yield call(() => {
      return api.post('Solucao/Restricao', {
        ...create
      })
    })

    const { ok: createOk } = postResponse as ApiResponse<GenericApiResponse>

    yield put(loading(false))

    if (!createOk) {
      put(schoolPermissionsFailure())
      throw new Error('Erro ao criar permissões')
    }

    put(schoolPermissionsSuccess())
  }
}

export default all([
  takeLatest(Actions.PROFILE_PERMISSIONS_REQUEST, profilePermissions),
  takeLatest(Actions.SCHOOL_PERMISSIONS_REQUEST, schoolPermissions)
])
