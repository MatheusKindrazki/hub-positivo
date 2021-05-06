import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put } from 'redux-saga/effects'
import { Action } from 'redux'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import {
  Actions,
  solutionPostSuccess,
  solutionPostFailure,
  solutionDeleteSuccess,
  solutionDeleteFailure
} from './actions'
import { loading } from '../global/actions'

export function* createSolution(action: Action): Generator {
  yield put(loading(true))

  const response = yield call(() => {
    return api.post('Solucao', {
      ...action.payload.solution
    })
  })

  const { ok, data } = response as ApiResponse<Solution>

  yield put(loading(false))

  if (!ok || !data) {
    toast.error('Erro ao criar solução!')
    return yield put(solutionPostFailure())
  }
  return yield put(solutionPostSuccess())
}

export function* deleteSolution(action: Action): Generator {
  yield put(loading(true))

  const response = yield call(() => {
    return api.get('Solucao/ExcluiCard', {
      params: {
        idCard: action.payload.id
      }
    })
  })
  const { ok, data } = response as ApiResponse<Solution>

  yield put(loading(false))

  if (!ok || !data) {
    toast.error('Erro ao deletar solução!')
    return yield put(solutionDeleteFailure())
  }
  return yield put(solutionDeleteSuccess())
}

export default all([
  takeLatest(Actions.SOLUTION_POST_REQUEST, createSolution),
  takeLatest(Actions.SOLUTION_DELETE_REQUEST, deleteSolution)
])
