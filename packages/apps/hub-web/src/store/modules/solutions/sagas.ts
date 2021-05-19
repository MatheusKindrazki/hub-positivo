import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put } from 'redux-saga/effects'
import { Action } from 'redux'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import history from '~/services/history'

import { Category, SolutionPutResponse, DeleteResponse } from './types'
import {
  Actions,
  solutionPostSuccess,
  solutionPostFailure,
  solutionsGetFailure,
  solutionsGetSuccess,
  solutionsGetRequest,
  solutionPutSuccess,
  solutionPutFailure,
  solutionDeleteSuccess,
  solutionDeleteFailure,
  solutionRestaureFailure,
  solutionRestaureSuccess
} from './actions'

export function* createSolution(action: Action): Generator {
  const response = yield call(() => {
    return api.post('Solucao', {
      ...action.payload.solution
    })
  })

  const { ok, data } = response as ApiResponse<{ dados: { id: string } }>

  if (!ok || !data) {
    toast.error('Erro ao criar solução!')
    return yield put(solutionPostFailure())
  }

  toast.success('Solução criada com sucesso')
  yield put(solutionPostSuccess(data?.dados.id))
  return yield data?.dados.id
}

export function* getSolutions(action: Action): Generator {
  const response = yield call(() => {
    return api.get(
      'Categoria/SolucoesPerfisRestricoes',
      {},
      {
        params: {
          EstadoSolucao: action.payload.status
        }
      }
    )
  })

  const { ok, data } = response as ApiResponse<Category[]>

  if (!ok) {
    toast.error('Erro ao buscar as produtos por categoria!')
    return yield put(solutionsGetFailure())
  }
  return yield put(solutionsGetSuccess(data))
}

// type SolutionPutPayload = Payload<PutSolutionData>

export function* updateSolution(action: Action): Generator {
  const response = yield call(async () => {
    return api.put('/Solucao', {
      ...action.payload
    })
  })

  const { ok, data } = response as ApiResponse<SolutionPutResponse>

  if (!ok || !data?.sucesso) {
    toast.error(
      'Erro ao atualizar solução, atualize a página e tente novamente'
    )
    return put(solutionPutFailure())
  }
  toast.success('Informações de solução atualizada com sucesso')
  return yield put(solutionPutSuccess())
}

export function* deleteSolution(action: Action): Generator {
  const response = yield call(() => {
    return api.delete('Solucao/ExcluiCard', {
      idCard: action.payload.id
    })
  })
  const { ok, data } = response as ApiResponse<DeleteResponse>

  if (data?.mensagem.includes('solução ativa')) {
    toast.error('Não é possível excluir uma solução ativa!')
    return yield put(solutionDeleteFailure())
  }

  if (!ok || !data) {
    toast.error('Erro ao excluir solução!')
    return yield put(solutionDeleteFailure())
  }

  toast.success('Solução excluída com sucesso!')
  yield put(solutionDeleteSuccess())
  history.push('/controle-de-acessos')
}

export function* restaureSolution(action: Action): Generator {
  const response = yield call(() => {
    return api.put(
      '/Solucao/RecuperaSolucaoDaLixeira',
      {},
      {
        params: {
          idCard: action.payload.id
        }
      }
    )
  })

  const { ok } = response as ApiResponse<SolutionPutResponse>

  if (!ok) {
    toast.error('Erro ao restaurar solução, tente novamente!')
    return yield put(solutionRestaureFailure())
  }
  yield put(solutionsGetRequest('EXCLUIDA'))
  toast.success('Solução restaurada com sucesso')
  put(solutionsGetRequest('EXCLUIDA'))
  return yield put(solutionRestaureSuccess())
}

export default all([
  takeLatest(Actions.SOLUTION_POST_REQUEST, createSolution),
  takeLatest(Actions.SOLUTIONS_GET_REQUEST, getSolutions),
  takeLatest(Actions.SOLUTION_PUT_REQUEST, updateSolution),
  takeLatest(Actions.SOLUTION_DELETE_REQUEST, deleteSolution),
  takeLatest(Actions.SOLUTION_RESTAURE_REQUEST, restaureSolution)
])
