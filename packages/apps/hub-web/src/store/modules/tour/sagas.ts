import { all, takeLatest, call, put } from 'redux-saga/effects'

import api from '@hub/api'
import { toast } from '@hub/common/utils'

import { ApiResponse } from 'apisauce'

import {
  Actions,
  getTourViewedFailure,
  getTourViewedSuccess,
  openTour
} from './actions'
export function* getViewed(): Generator {
  const response = yield call(() => {
    return api.get('/Tour')
  })

  const { data, ok } = response as ApiResponse<boolean>
  if (!ok) {
    toast.error('erro ao buscar informações do Tour')
    console.error(data)

    return yield put(getTourViewedFailure())
  }
  return yield put(getTourViewedSuccess({ viewed: data as boolean }))
}

export function* postTour(): Generator {
  yield put(openTour(false))

  const response = yield call(() => {
    return api.post('/Tour')
  })

  const { data, ok } = response as ApiResponse<boolean>
  if (!ok) {
    console.error(data)

    return
  }

  return yield true
}

export default all([
  takeLatest(Actions.GET_INFO_VIEWED_REQUEST, getViewed),
  takeLatest(Actions.POST_TOUR, postTour)
])
