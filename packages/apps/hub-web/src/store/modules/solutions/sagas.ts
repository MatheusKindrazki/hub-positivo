import { ApiResponse } from 'apisauce'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import { Solutions } from './types'
import { Actions, solutionsFailure, solutionsSuccess } from './actions'

export function* getSolutions(): Generator {
  yield put(loading(true))

  const response = yield call(() => {
    return api.get('Categoria/SolucoesPerfisRestricoes')
  })

  const { ok, data } = response as ApiResponse<Solutions[]>

  yield put(loading(false))

  if (!ok) {
    toast.error('Erro ao buscar as produtos por categoria!')
    return yield put(solutionsFailure())
  }

  return yield put(solutionsSuccess(data))
}

export default all([takeLatest(Actions.SOLUTIONS_REQUEST, getSolutions)])
