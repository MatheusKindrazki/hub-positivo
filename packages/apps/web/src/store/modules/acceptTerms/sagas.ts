import { ApiResponse } from 'apisauce'

import { all, takeLatest, call, delay, put } from 'redux-saga/effects'

import { store } from '~/store'

import api from '@psdhub/api'

import {
  Actions,
  acceptTermsFailure,
  checkTermsFailure,
  checkTermsSuccess,
  acceptTermsSuccess,
  TERM_VERSION
} from './actions'

export function* checkingTerms(): Generator {
  const { reduced_token } = store.getState().auth
  const { firstCall } = store.getState().acceptTerms

  if (firstCall) return

  api.setHeader('Authorization', `Bearer ${reduced_token}`)

  yield delay(1000)

  const response = yield call(() => {
    return api.get('/conta/TermosDeUso/ConsultarLeitura')
  })

  const { ok, data } = response as ApiResponse<{ versaoLida: string }[]>

  const accepted = data?.some(({ versaoLida }) => versaoLida === TERM_VERSION)

  if (!ok) {
    return yield put(checkTermsFailure())
  }

  return yield put(checkTermsSuccess(accepted || false))
}

export function* acceptTerms(): Generator {
  const response = yield call(() => {
    return api.post('/conta/TermosDeUso/MarcarLeitura', {
      versaoLida: TERM_VERSION
    })
  })

  const { ok } = response as ApiResponse<unknown>

  if (!ok) {
    return yield put(acceptTermsFailure())
  }

  return yield put(acceptTermsSuccess())
}

export default all([
  takeLatest(Actions.TERMS_REQUEST, acceptTerms),
  takeLatest(Actions.CHECK_TERMS_REQUEST, checkingTerms)
])
