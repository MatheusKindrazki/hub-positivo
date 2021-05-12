import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put, Payload } from 'redux-saga/effects'
import { Action } from 'redux'

import { loading } from '~/store/modules/global/actions'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import history from '~/services/history'

import {
  Category,
  Solution,
  PutSolutionData,
  SolutionPutResponse,
  DeleteResponse
} from './types'
import {
  Actions,
  solutionPostSuccess,
  solutionPostFailure,
  solutionsGetFailure,
  solutionsGetSuccess,
  solutionPutSuccess,
  solutionPutFailure,
  solutionDeleteSuccess,
  solutionDeleteFailure
} from './actions'

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
    console.log('retorno api na saga createSolution: ', data)
    return yield put(solutionPostFailure())
  }
  toast.success('Solução criada com sucesso')
  return yield put(solutionPostSuccess())
}

export function* getSolutions(): Generator {
  yield put(loading(true))

  const response = yield call(() => {
    return api.get('Categoria/SolucoesPerfisRestricoes')
  })

  const { ok, data } = response as ApiResponse<Category[]>

  yield put(loading(false))

  if (!ok) {
    toast.error('Erro ao buscar as produtos por categoria!')
    return yield put(solutionsGetFailure())
  }
  return yield put(solutionsGetSuccess(data))
}

type SolutionPutPayload = Payload<PutSolutionData>

export function* updateSolution({ payload }: SolutionPutPayload): Generator {
  yield put(loading(true))

  console.log('updating solution', payload)

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
  setTimeout(() => history.push('/controle-de-acessos'), 800)
  toast.success('Solução atualizada com sucesso')
  return yield put(solutionPutSuccess())
}

export function* deleteSolution(action: Action): Generator {
  yield put(loading(true))

  const response = yield call(() => {
    return api.delete('Solucao/ExcluiCard', {
      idCard: action.payload.id
    })
  })
  const { ok, data } = response as ApiResponse<DeleteResponse>

  yield put(loading(false))

  if (data?.mensagem.includes('solução ativa')) {
    toast.error('Não é possível excluir uma solução ativa!')
    console.log(response)
    return yield put(solutionDeleteFailure())
  }

  if (!ok || !data) {
    toast.error('Erro ao excluir solução!')
    console.log(response)
    return yield put(solutionDeleteFailure())
  }

  toast.success('Solução excluída com sucesso!')
  return yield put(solutionDeleteSuccess())
}

export default all([
  takeLatest(Actions.SOLUTION_POST_REQUEST, createSolution),
  takeLatest(Actions.SOLUTIONS_GET_REQUEST, getSolutions),
  takeLatest(Actions.SOLUTION_PUT_REQUEST, updateSolution),
  takeLatest(Actions.SOLUTION_DELETE_REQUEST, deleteSolution)
])
