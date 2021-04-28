import { ApiResponse } from 'apisauce'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import { SolutionLinksAPI } from './types'
import {
  Actions,
  solutionsLinksFailure,
  solutionsLinksSuccess
} from './actions'

export function* getSolutions(): Generator {
  yield put(loading(true))

  const response = yield call(() => {
    return api.get('/SolucaoPerfilNivelEnsino')
  })

  const { ok, data } = response as ApiResponse<SolutionLinksAPI[]>

  yield put(loading(false))

  if (!ok) {
    toast.error(
      'Erro ao buscar as vínculos de perfil e níveis de ensino das soluções'
    )
    return yield put(solutionsLinksFailure())
  }

  return yield put(solutionsLinksSuccess(data))
}

export default all([takeLatest(Actions.SOLUTIONS_LINKS_REQUEST, getSolutions)])
