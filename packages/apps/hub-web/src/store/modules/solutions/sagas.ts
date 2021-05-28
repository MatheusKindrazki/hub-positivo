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
  restoreSolutionFailure,
  restoreSolutionSuccess,
  solutionGetExcludedFailure,
  solutionGetExcludedSuccess,
  solutionGetExcludedRequest,
  solutionPostReorderFailure,
  solutionPostReorderSuccess
} from './actions'

export function* createSolution(action: Action): Generator {
  const response = yield call(() => {
    return api.post('Solucao', {
      ...action.payload
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

export function* getSolutions(): Generator {
  const response = yield call(() => {
    return api.get(
      'categoria/solucoesPerfisRestricoes',
      {},
      {
        params: {
          EstadoSolucao: 'PUBLICADA'
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

export function* getExcludedSolutions(): Generator {
  const response = yield call(() => {
    return api.get(
      'categoria/solucoesPerfisRestricoes',
      {},
      {
        params: {
          EstadoSolucao: 'EXCLUIDA'
        }
      }
    )
  })

  const { ok, data } = response as ApiResponse<Category[]>
  if (!ok) {
    toast.error('Erro ao buscar as itens da lixeira!')
    return yield put(solutionGetExcludedFailure())
  }
  return yield put(solutionGetExcludedSuccess(data))
}
export function* updateSolution(action: Action): Generator {
  const response = yield call(async () => {
    return api.put('/solucao', {
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
  return yield put(solutionPutSuccess())
}

export function* deleteSolution(action: Action): Generator {
  const response = yield call(() => {
    return api.delete('solucao/excluiCard', {
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
  yield put(solutionsGetRequest())
  yield put(solutionGetExcludedRequest())
  history.push('/controle-de-acessos')
}

export function* restoreSolution(action: Action): Generator {
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
    return yield put(restoreSolutionFailure())
  }
  yield put(solutionGetExcludedRequest())
  yield put(solutionsGetRequest())
  toast.success('Solução restaurada com sucesso')
  return yield put(restoreSolutionSuccess())
}
export function* reorderSolutions(action: Action): Generator {
  const response = yield call(() => {
    return api.post('solucao/reordenaCards', action.payload)
  })

  const { ok } = response as ApiResponse<any>
  if (!ok) {
    toast.error('Nenhuma solução foi reordenada, tente novamente!')
    return yield put(solutionPostReorderFailure())
  }

  return yield put(solutionPostReorderSuccess())
}
export default all([
  takeLatest(Actions.SOLUTION_POST_REQUEST, createSolution),
  takeLatest(Actions.SOLUTIONS_GET_REQUEST, getSolutions),
  takeLatest(Actions.SOLUTION_PUT_REQUEST, updateSolution),
  takeLatest(Actions.SOLUTION_DELETE_REQUEST, deleteSolution),
  takeLatest(Actions.RESTORE_SOLUTION_REQUEST, restoreSolution),
  takeLatest(Actions.SOLUTIONS_GET_EXCLUDED_REQUEST, getExcludedSolutions),
  takeLatest(Actions.SOLUTIONS_POST_REORDER_REQUEST, reorderSolutions)
])
