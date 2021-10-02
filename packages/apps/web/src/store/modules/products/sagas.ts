import { ApiResponse } from 'apisauce'

import { all, call, delay, put, takeLatest } from 'redux-saga/effects'

import { getTourRequest } from '~/store/modules/tour/actions'
import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import { getInstance, statusCodeCondition } from '@psdhub/api'

import { CardProduct } from './types'
import { Actions, productSuccess } from './actions'
import { noBreakAccessEnable } from '../noBreakAccess/actions'
import { enableRefreshTokenMiddleware, loading } from '../global/actions'
import { withoutAccess } from '../auth/actions'

export function* getProducts(): Generator {
  yield put(loading(true))
  const { guid } = store.getState().profile
  const { level } = store.getState().educationalStage

  const { info: user, school } = store.getState().user

  if (!user && !school) return

  const enableFilterLevel = ['PROFESSOR', 'ALUNO']

  if (enableFilterLevel.includes(guid)) {
    if (!level) {
      yield put(loading(false))
      return yield put(withoutAccess())
    }
  }

  const api = getInstance()

  const response = yield call(async () => {
    return api.get(`Categoria/Solucoes/Perfil/${guid}`, {
      NivelEnsino: level,
      IdEscola: school?.value
    })
  })

  const { ok, data, status } = response as ApiResponse<CardProduct[]>

  if (statusCodeCondition.includes(status as number)) {
    yield put(
      noBreakAccessEnable({
        user_login: user?.username || ''
      })
    )
    return yield put(loading(false))
  }

  if (!ok && status !== 401) {
    toast.error('Erro ao buscar soluções, tente novamente mais tarde!')
    return
  }

  yield put(loading(false))

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

  // Aguarda os cards em tela para buscar o tour
  yield delay(100)

  yield put(getTourRequest())

  // Aguarda resposta do tour para não realizar novo refresh token
  yield delay(100)

  return yield put(enableRefreshTokenMiddleware(true))
}

export default all([takeLatest(Actions.PRODUCT_REQUEST, getProducts)])
