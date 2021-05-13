// import { toast } from 'react-toastify'

import { takeLatest, all, Payload, put, call } from 'redux-saga/effects'

import { AccessControlPutData, AccessControlPostData } from './types'
import {
  Actions
  // accessControlPostFailure,
  // accessControlPostSuccess
} from './actions'
// import api, { } from '@psdhub/api'
import { createSolution } from '../solutions/sagas'
import { solutionPostRequest, solutionPutRequest } from '../solutions/actions'
import {
  profilePermissionsRequest,
  schoolPermissionsRequest
} from '../permissions/actions'

export const postAccessControlData: AccessControlPostData = {
  solution: {
    idCategoria: '84ff9ff2-1f47-4e29-9f24-a848d852d468',
    nome: 'o post esta funcionando',
    descricao: 'Esta solucao é um teste',
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
      idsEscolas: ['a3684569-764d-4ad1-b816-9a11736e5adf'],
      restricao: 'Ocultar'
    }
  },
  profilePermissions: {
    create: {
      idSolucao: '',
      IdsPerfisNiveisEnsino: ['6190aaa0-cbd5-488c-9b49-ab86f52728b1']
    },
    remove: {
      idSolucao: '',
      IdsPerfisNiveisEnsino: []
    }
  }
}

// chamar submitPost > Chamar solutionPost > alterar id na Store > chamar permissions

type PostAccessControlPayload = Payload<AccessControlPostData>

export function* submitPostAccessControl({
  payload
}: PostAccessControlPayload): Generator {
  console.log('saga access control', payload)
  const { solution, profilePermissions, schoolPermissions } = payload

  const id = yield call(createSolution, solutionPostRequest(solution))

  console.log('id extraido do putResolve: ', id)

  if (id) {
    profilePermissions.create.idSolucao = id as string
    profilePermissions.remove.idSolucao = id as string
    yield put(profilePermissionsRequest(profilePermissions))

    schoolPermissions.create.idSolucao = id as string
    schoolPermissions.remove.idSolucao = id as string
    yield put(schoolPermissionsRequest(schoolPermissions))
  }
}

type PutAccessControlPayload = Payload<AccessControlPutData>

export function* submitPutAccessControl({
  payload
}: PutAccessControlPayload): Generator {
  const { solution, profilePermissions, schoolPermissions } = payload
  yield put(solutionPutRequest(solution))

  yield put(profilePermissionsRequest(profilePermissions))

  yield put(schoolPermissionsRequest(schoolPermissions))

  // return put(accessControlPostFailure())
  // return yield put(accessControlPostSuccess())
}

export default all([
  takeLatest(Actions.ACCESS_CONTROL_POST_REQUEST, submitPostAccessControl),
  takeLatest(Actions.ACCESS_CONTROL_PUT_REQUEST, submitPutAccessControl)
])
