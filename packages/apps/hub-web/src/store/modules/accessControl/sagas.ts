import { takeLatest, all, Payload, put, call } from 'redux-saga/effects'

import history from '~/services/history'

import { AccessControlPutData, AccessControlPostData } from './types'
import { Actions } from './actions'
import { createSolution, updateSolution } from '../solutions/sagas'
import { solutionPostRequest, solutionPutRequest } from '../solutions/actions'
import {
  profilePermissions as profileSaga,
  schoolPermissions as schoolSaga
} from '../permissions/sagas'
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
    schoolPermissions.create.idSolucao = id
    schoolPermissions.remove.idSolucao = id
    all([
      yield call(profileSaga, profilePermissionsRequest(profilePermissions)),
      yield call(schoolSaga, schoolPermissionsRequest(schoolPermissions))
    ])
    yield put(loading(false))
    history.push('/controle-de-acessos')
  }
}

type PutAccessControlPayload = Payload<AccessControlPutData>

export function* submitPutAccessControl({
  payload
}: PutAccessControlPayload): Generator {
  const { solution, profilePermissions, schoolPermissions } = payload
  yield put(loading(true))

  all([
    yield call(updateSolution, solutionPutRequest(solution)),
    yield call(profileSaga, profilePermissionsRequest(profilePermissions)),
    yield call(schoolSaga, schoolPermissionsRequest(schoolPermissions))
  ])
  yield put(loading(false))
  return yield history.push('/controle-de-acessos')
}

export default all([
  takeLatest(Actions.ACCESS_CONTROL_POST_REQUEST, submitPostAccessControl),
  takeLatest(Actions.ACCESS_CONTROL_PUT_REQUEST, submitPutAccessControl)
])
