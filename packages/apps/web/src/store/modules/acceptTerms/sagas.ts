import { ApiResponse } from 'apisauce'

import { all, takeLatest, call, put } from 'redux-saga/effects'

import api from '@psdhub/api'

import { Actions, acceptTermsFailure, acceptTermsSuccess } from './actions'

export function* acceptTerms(): Generator {
  const response = yield call(() => {
    return api.post('/conta/TermosDeUso/MarcarLeitura', {
      versaoLida: '1.0.0'
    })
  })

  const { ok } = response as ApiResponse<unknown>

  if (!ok) {
    return yield put(acceptTermsFailure())
  }

  return yield put(acceptTermsSuccess())
}

export default all([takeLatest(Actions.TERMS_REQUEST, acceptTerms)])
