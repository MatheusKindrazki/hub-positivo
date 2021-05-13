import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put, Payload } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'

import { toast } from '@psdhub/common/utils'
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

  if (remove.IdsPerfisNiveisEnsino?.length) {
    const removeResponse = yield call(() => {
      return api.delete('SolucaoPerfilNivelEnsino', {}, { data: remove })
    })

    const { ok: removeOk } = removeResponse as ApiResponse<any>

    if (!removeOk) {
      toast.error('Erro ao atualizar permissões de perfil')
      return yield put(profilePermissionsFailure())
    }
  }

  if (create.IdsPerfisNiveisEnsino?.length) {
    const createResponse = yield call(() => {
      return api.post('SolucaoPerfilNivelEnsino', {
        ...create
      })
    })

    const { ok: createOk } = createResponse as ApiResponse<any>
    if (!createOk) {
      toast.error('Erro ao atualizar permissões de perfil')
      return put(profilePermissionsFailure())
    }
    toast.success('Permissoes de perfil atualizadas com sucesso!')
    return yield put(profilePermissionsSuccess())
  }
}

type SchoolPermissionsPayload = Payload<SchoolPermissions>

export function* schoolPermissions({
  payload
}: SchoolPermissionsPayload): Generator {
  const { create, remove } = payload

  // Remove permissoes interrompendo o fluxo caso haja algum erro
  yield put(loading(true))

  if (remove.idsEscolas?.length) {
    const deleteResponse = yield call(() => {
      return api.delete('Solucao/Restricao', {}, { data: remove })
    })

    const { ok: removeOk } = deleteResponse as ApiResponse<GenericApiResponse>
    yield put(loading(false))

    if (!removeOk) {
      toast.error('Algo deu errado no momento de atualizar permissões')
      put(schoolPermissionsFailure())
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
      toast.error('Algo deu errado no momento de atualizar restrições')
      return put(schoolPermissionsFailure())
    }
    toast.success('Restrições atualizadas com sucesso')
    return put(schoolPermissionsSuccess())
  }
}

export default all([
  takeLatest(Actions.PROFILE_PERMISSIONS_REQUEST, profilePermissions),
  takeLatest(Actions.SCHOOL_PERMISSIONS_REQUEST, schoolPermissions)
])
