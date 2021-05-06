import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put, Payload } from 'redux-saga/effects'
import { Action } from 'redux'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import { Solution } from './types'
import type { PutSolutionData, SolutionPutResponse } from './types'
import {
  Actions,
  solutionPostSuccess,
  solutionPostFailure,
  solutionDeleteSuccess,
  solutionDeleteFailure,
  solutionPutSuccess,
  solutionPutFailure
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

type SolutionPutPayload = Payload<PutSolutionData>
export function* updateSolution({ payload }: SolutionPutPayload): Generator {
  yield put(loading(true))

  const response = yield call(async () => {
    return api.put('/Solucao', {
      ...payload
    })
  })

  const { ok, data } = response as ApiResponse<SolutionPutResponse>
  yield put(loading(false))
  console.log({ ok, data })

  if (!ok || !data?.sucesso) {
    toast.error(
      'Erro ao atualizar solução, atualize a página e tente novamente'
    )
    return put(solutionPutFailure())
  }

  toast.success('Solução atualizada com sucesso')
  return yield put(solutionPutSuccess())
}

export default all([
  takeLatest(Actions.SOLUTION_POST_REQUEST, createSolution),
  takeLatest(Actions.SOLUTION_DELETE_REQUEST, deleteSolution),
  takeLatest(Actions.SOLUTION_PUT_REQUEST, updateSolution)
])
