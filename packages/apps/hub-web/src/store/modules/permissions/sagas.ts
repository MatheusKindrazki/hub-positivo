import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put, Payload } from 'redux-saga/effects'

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
  profilePermissionsFailure,
  schoolPermissionsSuccess,
  schoolPermissionsFailure
} from './actions'

type UpdateProfilePayload = Payload<ProfilePermissions>

export function* profilePermissions({
  payload
}: UpdateProfilePayload): Generator {
  const { create, remove } = payload

  if (
    !remove.IdsPerfisNiveisEnsino?.length &&
    !create.IdsPerfisNiveisEnsino?.length
  ) {
    return
  }

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
  }

  toast.success('Permissoes de perfil atualizadas com sucesso!')
  return put(profilePermissionsSuccess())
}

type SchoolPermissionsPayload = Payload<SchoolPermissions>

export function* schoolPermissions({
  payload
}: SchoolPermissionsPayload): Generator {
  const { create, remove } = payload

  if (!remove.idsEscolas?.length && !create.idsEscolas?.length) return

  // Remove permissoes interrompendo o fluxo caso haja algum erro
  if (remove.idsEscolas?.length) {
    const deleteResponse = yield call(() => {
      return api.delete('Solucao/Restricao', {}, { data: remove })
    })

    const { ok: removeOk } = deleteResponse as ApiResponse<GenericApiResponse>

    if (!removeOk) {
      toast.error('Algo deu errado no momento de atualizar permissões')
      put(schoolPermissionsFailure())
    }

    yield put(schoolPermissionsSuccess())
  }

  // Cria permissoes interrompendo o fluxo caso haja algum erro
  if (create.idsEscolas?.length) {
    const postResponse = yield call(() => {
      return api.post('Solucao/Restricao', {
        ...create
      })
    })

    const { ok: createOk, data } = postResponse as ApiResponse<any>
    console.log({ data }, 'permissionData')
    if (!createOk) {
      data?.dados?.forEach((e: any) => {
        console.log({ e })
        toast.error(e.message)
      })
      // toast.error('Algo deu errado no momento de atualizar restrições')
      return put(schoolPermissionsFailure())
    }
  }

  toast.success('Restrições atualizadas com sucesso')
  return put(schoolPermissionsSuccess())
}

export default all([
  takeLatest(Actions.PROFILE_PERMISSIONS_REQUEST, profilePermissions),
  takeLatest(Actions.SCHOOL_PERMISSIONS_REQUEST, schoolPermissions)
])
