import { takeLatest, all, Payload, put, call } from 'redux-saga/effects'

import { AccessControlPutData, AccessControlPostData } from './types'
import { Actions } from './actions'
import { createSolution } from '../solutions/sagas'
import { solutionPostRequest, solutionPutRequest } from '../solutions/actions'
import {
  profilePermissionsRequest,
  schoolPermissionsRequest
} from '../permissions/actions'
import { loading } from '../global/actions'

export const postAccessControlData: AccessControlPutData = {
  solution: {
    id: 'c0b68504-e9bb-4a43-857a-106f805d684e',
    ativo: false,
    slug: 'simulado-enem-ctpm-atualizado',
    idCategoria: '32e4823f-013c-4e66-9e32-2a3498a1f0f7',
    nome: 'Simulado Enem CTPM',
    descricao:
      'CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA EU NAO AGUENTO MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIS',
    arquivo: 'string',
    link: 'https://www.google.com.br',
    tipoRenderizacao: 'iframe',
    ordem: 1,
    padrao: true
  },
  schoolPermissions: {
    remove: {
      idSolucao: '',
      idsEscolas: []
    },
    create: {
      idSolucao: '',
      idsEscolas: [],
      restricao: 'Ocultar'
    }
  },
  profilePermissions: {
    create: {
      idSolucao: '',
      IdsPerfisNiveisEnsino: []
    },
    remove: {
      idSolucao: '',
      IdsPerfisNiveisEnsino: []
    }
  }
}

// idsEscolas: ['a3684569-764d-4ad1-b816-9a11736e5adf'],
// IdsPerfisNiveisEnsino: ['6190aaa0-cbd5-488c-9b49-ab86f52728b1'

type PostAccessControlPayload = Payload<AccessControlPostData>

export function* submitPostAccessControl({
  payload
}: PostAccessControlPayload): Generator {
  const { solution, profilePermissions, schoolPermissions } = payload
  yield put(loading(true))

  // cria solucao e aguarda a finalizacao para criar permissoes e restricoes
  const id = (yield call(
    createSolution,
    solutionPostRequest(solution)
  )) as string

  if (id) {
    profilePermissions.create.idSolucao = id
    profilePermissions.remove.idSolucao = id
    yield put(profilePermissionsRequest(profilePermissions))

    schoolPermissions.create.idSolucao = id
    schoolPermissions.remove.idSolucao = id
    yield put(schoolPermissionsRequest(schoolPermissions))

    yield put(loading(false))
  }
}

type PutAccessControlPayload = Payload<AccessControlPutData>

export function* submitPutAccessControl({
  payload
}: PutAccessControlPayload): Generator {
  const { solution, profilePermissions, schoolPermissions } = payload
  yield put(loading(true))

  yield put(solutionPutRequest(solution))

  yield put(profilePermissionsRequest(profilePermissions))

  yield put(schoolPermissionsRequest(schoolPermissions))

  yield put(loading(false))
}

export default all([
  takeLatest(Actions.ACCESS_CONTROL_POST_REQUEST, submitPostAccessControl),
  takeLatest(Actions.ACCESS_CONTROL_PUT_REQUEST, submitPutAccessControl)
])
