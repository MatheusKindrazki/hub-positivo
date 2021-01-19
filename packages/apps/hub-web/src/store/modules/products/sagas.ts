import { all, call, put, takeLatest } from 'redux-saga/effects'

import api from '@hub/api'
import { toast } from '@hub/common/utils'

import { ApiResponse } from 'apisauce'

import { store } from '~/store'
import { getTourRequest } from '~/store/modules/tour/actions'

import { withoutAccess } from '../auth/actions'
import { loading } from '../global/actions'
import { mhundArvoreIntegration } from '../productIntegrations/actions'
import { Actions, productSuccess } from './actions'
import { CardProduct } from './types'

export function* getProducts(): Generator {
  yield put(loading(true))

  const enableFilterLevel = ['PROFESSOR', 'ALUNO']

  const { guid } = store.getState().profile
  const { level } = store.getState().levelEducation

  const { user, school } = store.getState().user
  let query: string

  if (!user && !school) return

  if (enableFilterLevel.includes(guid)) {
    if (!level) {
      yield put(loading(false))
      return yield put(withoutAccess())
    }

    query = `${guid}?NivelEnsino=${level}`
  } else {
    query = `${guid}`
  }

  const response = yield call(() => {
    return api.get(`Categoria/Solucoes/Perfil/${query}`)
  })

  const { ok, data, status } = response as ApiResponse<CardProduct[]>

  if (!ok && status !== 401) {
    toast.error('Erro ao buscar soluções, tente novamente mais tarde!')
    return
  }

  yield put(loading(false))

  yield put(getTourRequest())

  yield put(
    productSuccess({
      data: data
        ?.filter(e => e.ativo)
        .map(c => {
          return {
            ...c,
            solucoes: c.solucoes.filter(s => s.ativo)
          }
        })
    })
  )

  yield put(mhundArvoreIntegration())
}

export default all([takeLatest(Actions.PRODUCT_REQUEST, getProducts)])
