import { takeLatest, all, Payload, put, call } from 'redux-saga/effects'

import history from '~/services/history'

import { AccessControlPutData, AccessControlPostData } from './types'
import { Actions } from './actions'
import { createSolution } from '../solutions/sagas'
import {
  solutionPostRequest,
  solutionPutRequest,
  solutionsGetRequest
} from '../solutions/actions'
import {
  profilePermissionsRequest,
  schoolPermissionsRequest
} from '../permissions/actions'
import { loading } from '../global/actions'

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
  }
  yield put(solutionsGetRequest())
  yield put(loading(false))
  history.push('/controle-de-acessos')
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

  yield put(solutionsGetRequest())
  history.push('/controle-de-acessos')
}

export default all([
  takeLatest(Actions.ACCESS_CONTROL_PUT_REQUEST, submitPutAccessControl),
  takeLatest(Actions.ACCESS_CONTROL_POST_REQUEST, submitPostAccessControl)
])
