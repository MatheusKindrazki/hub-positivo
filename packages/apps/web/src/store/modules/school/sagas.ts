import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, put } from 'redux-saga/effects'

import { toast } from '@psdhub/common/utils'
import { getInstance } from '@psdhub/api'

import { School } from './types'
import { Actions, schoolGetAllFailure, schoolGetAllSuccess } from './actions'
import { loading } from '../global/actions'

export function* getSchools(): Generator {
  const api = getInstance()

  yield put(loading(true))

  const response = yield call(() => {
    return api.get('escola')
  })

  const { ok, data } = response as ApiResponse<School[]>

  yield put(loading(false))

  if (!ok || !data) {
    toast.error('Erro ao buscar lista de escolas cadastradas!')
    return yield put(schoolGetAllFailure())
  }
  return yield put(schoolGetAllSuccess(data))
}

export default all([takeLatest(Actions.SCHOOL_GETALL_REQUEST, getSchools)])
