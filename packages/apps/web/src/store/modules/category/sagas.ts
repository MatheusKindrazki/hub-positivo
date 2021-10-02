import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, Payload, put } from 'redux-saga/effects'

import { toast } from '@psdhub/common/utils'
import { getInstance } from '@psdhub/api'

import { CategoryPostData, CategoryPostResponse, Category } from './types'
import {
  Actions,
  categoryPostSuccess,
  categoryPostFailure,
  categoryGetAllFailure,
  categoryGetAllSuccess
} from './actions'
import { loading } from '../global/actions'

type CategoryPostPayload = Payload<CategoryPostData>

export function* createCategory({ payload }: CategoryPostPayload): Generator {
  const api = getInstance()

  const response = yield call(async () => {
    return api.post('/categoria', payload)
  })

  const { ok, data } = response as ApiResponse<CategoryPostResponse>

  if (!ok || !data?.sucesso) {
    toast.error('Erro ao criar categoria')
    return yield put(categoryPostFailure())
  }

  toast.success('Categoria criada com sucesso')
  return yield put(categoryPostSuccess())
}

export function* getCategories(): Generator {
  const api = getInstance()

  yield put(loading(true))

  const response = yield call(() => {
    return api.get('categoria')
  })

  const { ok, data } = response as ApiResponse<Category[]>

  yield put(loading(false))

  if (!ok || !data) {
    toast.error('Erro ao buscar as categorias!')
    return yield put(categoryGetAllFailure())
  }
  return yield put(categoryGetAllSuccess(data))
}

export default all([
  takeLatest(Actions.CATEGORY_POST_REQUEST, createCategory),
  takeLatest(Actions.CATEGORY_GETALL_REQUEST, getCategories)
])
