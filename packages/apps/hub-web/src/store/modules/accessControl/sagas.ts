// import { toast } from 'react-toastify'

import { takeLatest, all, Payload, put } from 'redux-saga/effects'

import { AccessControlPutData } from './types'
import {
  Actions
  // accessControlPostFailure,
  // accessControlPostSuccess
} from './actions'
// import api, { } from '@psdhub/api'
import { solutionPutRequest } from '../solutions/actions'
import {
  profilePermissionsRequest,
  schoolPermissionsRequest
} from '../permissions/actions'

export const postAccessControlData: AccessControlPutData = {
  solution: {
    id: '18364a7a-fe11-4b68-a0fd-cf0bea8dcc4e',
    idCategoria: '84ff9ff2-1f47-4e29-9f24-a848d852d468',
    nome: 'MUDAMOS-O-NOME-UMA-TERCEIRA-VEZ',
    descricao: 'Esta solucao é um teste',
    arquivo: 'string',
    link: 'https://www.google.com.br',
    tipoRenderizacao: 'iframe',
    ordem: 1,
    padrao: true,
    ativo: true,
    slug: 'pipoquinha-agora-para-assistir'
  },
  schoolPermissions: {
    remove: {
      idSolucao: '18364a7a-fe11-4b68-a0fd-cf0bea8dcc4e',
      idsEscolas: []
    },
    create: {
      idSolucao: '18364a7a-fe11-4b68-a0fd-cf0bea8dcc4e',
      idsEscolas: ['a3684569-764d-4ad1-b816-9a11736e5adf'],
      restricao: 'Ocultar'
    }
  },
  profilePermissions: {
    create: {
      idSolucao: '18364a7a-fe11-4b68-a0fd-cf0bea8dcc4e',
      idsPerfilNivelDeEnsino: [],
      restricao: 'Ocultar'
    },
    remove: {
      idSolucao: '18364a7a-fe11-4b68-a0fd-cf0bea8dcc4e',
      idsPerfilNivelDeEnsino: []
    }
  }
}

// chamar submitPost > Chamar solutionPost > alterar id na Store > chamar permissions

// export function* submitPostAccessControl({
//   payload
// }: PostAccessControlPayload): Generator {
//   console.log('saga access control', payload)
//   const { solution, profilePermissions, schoolPermissions } = payload
//   yield put(solutionPostRequest(solution))

//   // return put(accessControlPostFailure())
//   return yield put(accessControlPostSuccess())
// }

// export function* createSchoolPermissions({
//   payload
// }: {
//   id: string
// }): Generator {
//   yield put(profilePermissionsRequest(profilePermissions))
//   yield put(schoolPermissionsRequest(schoolPermissions))
// }

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
  // takeLatest(Actions.ACCESS_CONTROL_POST_REQUEST, submitPostAccessControl),
  takeLatest(Actions.ACCESS_CONTROL_PUT_REQUEST, submitPutAccessControl)
])
