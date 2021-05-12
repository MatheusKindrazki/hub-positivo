import { toast } from 'react-toastify'

import { takeLatest, all, Payload, put } from 'redux-saga/effects'

import history from '~/services/history'

import { AccessControlData } from './types'
import {
  Actions,
  accessControlPostFailure,
  accessControlPostSuccess
} from './actions'
// import api, { } from '@psdhub/api'
import { solutionPostRequest } from '../solutions/actions'
import {
  profilePermissionsRequest,
  schoolPermissionsRequest
} from '../permissions/actions'

type PostAccessControlPayload = Payload<AccessControlData>

export const postAccessControlData: AccessControlData = {
  solution: {
    idCategoria: '84ff9ff2-1f47-4e29-9f24-a848d852d468',
    nome: 'a modificacao da solucao foi um sucesso',
    descricao: 'Esta solucao é um teste',
    arquivo: 'string',
    link: 'https://www.google.com.br',
    idProduto: 'string',
    tipoRenderizacao: 'iframe',
    ordem: 1,
    padrao: true
  },
  schoolPermissions: {
    remove: {
      idSolucao: '4e4f5288-2874-4f92-b782-454b0b48d317',
      idsEscolas: [],
      restricao: 'Ocultar'
    },
    create: {
      idSolucao: '4e4f5288-2874-4f92-b782-454b0b48d317',
      idsEscolas: ['a3684569-764d-4ad1-b816-9a11736e5adf'],
      restricao: 'Ocultar'
    }
  },
  profilePermissions: {
    create: {
      idSolucao: '4e4f5288-2874-4f92-b782-454b0b48d317',
      idsPerfilNivelDeEnsino: [],
      restricao: 'Ocultar'
    },
    remove: {
      idSolucao: '4e4f5288-2874-4f92-b782-454b0b48d317',
      idsPerfilNivelDeEnsino: [],
      restricao: 'Ocultar'
    }
  }
}

export function* submitPostAccessControl({
  payload
}: PostAccessControlPayload): Generator {
  console.log('saga access control', payload)
  const { solution, profilePermissions, schoolPermissions } = payload

  try {
    yield put(solutionPostRequest(solution))
    yield put(profilePermissionsRequest(profilePermissions))
    yield put(schoolPermissionsRequest(schoolPermissions))
  } catch (error) {
    toast.error(error)
    return put(accessControlPostFailure())
  }
  setTimeout(() => history.push('/controle-de-acessos'), 800)
  return yield put(accessControlPostSuccess())
}

export function* submitPutAccessControl({
  payload
}: PostAccessControlPayload): Generator {
  const { solution, profilePermissions, schoolPermissions } = payload
  try {
    yield put(solutionPostRequest(solution))
    yield put(profilePermissionsRequest(profilePermissions))
    yield put(schoolPermissionsRequest(schoolPermissions))
  } catch (error) {
    toast.error(error)
    return put(accessControlPostFailure())
  }
  return yield put(accessControlPostSuccess())
}

export default all([
  takeLatest(Actions.ACCESS_CONTROL_POST_REQUEST, submitPostAccessControl),
  takeLatest(Actions.ACCESS_CONTROL_PUT_REQUEST, submitPutAccessControl)
])
