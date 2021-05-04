import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, Payload, put } from 'redux-saga/effects'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import { CategoryPostData, CategoryPostResponse } from './types'
import { Actions, categoryPostSuccess, categoryPostFailure } from './actions'

type CategoryPostPayload = Payload<CategoryPostData>

export function* createCategory({ payload }: CategoryPostPayload): Generator {
  const response = yield call(async () => {
    return api.post('/Categoria', payload)
  })

  const { ok, data } = response as ApiResponse<CategoryPostResponse>
  console.log({ ok, data })

  if (!ok || !data?.sucesso) {
    toast.error('Erro ao criar categoria')
    return yield put(categoryPostFailure())
  }

  toast.success('Solução atualizada com sucesso')
  return yield put(categoryPostSuccess())
}

export default all([takeLatest(Actions.CATEGORY_POST_REQUEST, createCategory)])
