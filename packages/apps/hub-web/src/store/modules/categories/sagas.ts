import { ApiResponse } from 'apisauce'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import { CategoryAPI } from './types'
import { Actions, categoriesFailure, categoriesSuccess } from './actions'

export function* getCategories(): Generator {
  yield put(loading(true))

  const response = yield call(() => {
    return api.get('/Categoria')
  })

  const { ok, data } = response as ApiResponse<CategoryAPI[]>

  yield put(loading(false))

  if (!ok) {
    toast.error('Erro ao buscar as categorias!')
    return yield put(categoriesFailure())
  }

  return yield put(categoriesSuccess(data))
}

export default all([takeLatest(Actions.CATEGORIES_REQUEST, getCategories)])
