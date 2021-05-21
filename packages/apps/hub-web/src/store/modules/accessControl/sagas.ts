import { takeLatest, all, put, call } from 'redux-saga/effects'

import history from '~/services/history'

import { AccessControlPutData, AccessControlPostData } from './types'
import { Actions } from './actions'
import { PostSolutionData, PutSolutionData } from '../solutions/types'
import { createSolution, updateSolution } from '../solutions/sagas'
import {
  solutionPostRequest,
  solutionPutRequest,
  solutionsGetRequest
} from '../solutions/actions'
import {
  profilePermissions as profileSaga,
  schoolPermissions as schoolSaga
} from '../permissions/sagas'
import {
  profilePermissionsRequest,
  schoolPermissionsRequest
} from '../permissions/actions'
import { loading } from '../global/actions'
interface SubmitSolution {
  payload: AccessControlPostData | AccessControlPutData
  type: string
}

export function* submitSolution({ payload, type }: SubmitSolution): Generator {
  const { solution, profilePermissions, schoolPermissions } = payload

  if (type === Actions.ACCESS_CONTROL_POST_REQUEST) {
    const id = (yield call(
      createSolution,
      solutionPostRequest(solution as PostSolutionData)
    )) as string
    profilePermissions.create.idSolucao = id
    profilePermissions.remove.idSolucao = id
    schoolPermissions.create.idSolucao = id
    schoolPermissions.remove.idSolucao = id
  }

  if (type === Actions.ACCESS_CONTROL_PUT_REQUEST) {
    yield call(updateSolution, solutionPutRequest(solution as PutSolutionData))
  }

  all([
    yield call(profileSaga, profilePermissionsRequest(profilePermissions)),
    yield call(schoolSaga, schoolPermissionsRequest(schoolPermissions))
  ])

  yield put(solutionsGetRequest())
  yield put(loading(false))
  return yield history.push('/controle-de-acessos')
}

export default all([
  takeLatest(Actions.ACCESS_CONTROL_PUT_REQUEST, submitSolution),
  takeLatest(Actions.ACCESS_CONTROL_POST_REQUEST, submitSolution)
])
