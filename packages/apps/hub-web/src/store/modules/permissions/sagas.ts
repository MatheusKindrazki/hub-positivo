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
  const { create, remove } = payload

  const removeResponse = yield call(() => {
    return api.delete('ENDPOINT', {
      ...remove
    })
  })

  const { ok: removeOk } = removeResponse as ApiResponse<any>

  if (!removeOk) {
    throw new Error('Erro ao deletar permissões')
  }

  const createResponse = yield call(() => {
    return api.delete('ENDPOINT', {
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

type SchoolPermissionsPayload = Payload<SchoolPermissions>

export function* schoolPermissions({
  payload
}: SchoolPermissionsPayload): Generator {
  const { create, remove } = payload

  // Remove permissoes interrompendo o fluxo caso haja algum erro
  yield put(loading(true))

  const deleteResponse = yield call(() => {
    return api.delete('Solucao/Restricao/Escola', {
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

  // Cria permissoes interrompendo o fluxo caso haja algum erro
  yield put(loading(true))

  const postResponse = yield call(() => {
    return api.post('Solucao/Restricao/Escola', {
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

export default all([
  takeLatest(Actions.PROFILE_PERMISSIONS_REQUEST, profilePermissions),
  takeLatest(Actions.SCHOOL_PERMISSIONS_REQUEST, schoolPermissions)
])
