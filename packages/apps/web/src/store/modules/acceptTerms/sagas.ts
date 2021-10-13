import { ApiResponse } from 'apisauce'

import { all, takeLatest, call, put } from 'redux-saga/effects'

import { store } from '~/store'

import api from '@psdhub/api'

import {
  Actions,
  acceptTermsFailure,
  acceptTermsSuccess,
  TERM_VERSION
} from './actions'

export function* acceptTerms(): Generator {
  const { reduced_token } = store.getState().auth

  const response = yield call(() => {
    return api.post(
      '/conta/TermosDeUso/MarcarLeitura',
      {
        versaoLida: TERM_VERSION
      },
      {
        headers: {
          Authorization: `Bearer ${reduced_token}`
        }
      }
    )
  })

  const { ok } = response as ApiResponse<unknown>

  if (!ok) {
    return yield put(acceptTermsFailure())
  }

  return yield put(acceptTermsSuccess())
}

export default all([takeLatest(Actions.TERMS_REQUEST, acceptTerms)])
