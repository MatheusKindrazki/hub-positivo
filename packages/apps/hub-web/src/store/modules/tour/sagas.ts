import { all, call, put, takeLatest } from 'redux-saga/effects'

import api from '@hub/api'

import { ApiResponse } from 'apisauce'
import { toast } from 'react-toastify'

import { store } from '~/store'

import { Actions, getTourFailure, getTourSuccess } from './actions'

export function* getUserTour(): Generator {
  const profile = store.getState().profile

  if (profile.guid !== 'PROFESSOR') return

  const response = yield call(() => {
    return api.get('Tour')
  })

  const { data, ok } = response as ApiResponse<boolean>

  if (!ok) {
    toast.error('Erro ao buscar Tour')

    return yield put(getTourFailure())
  }

  return yield put(getTourSuccess(data || false))
}

export function* postUserTour(): Generator {
  console.log('brasil de mais')
  const response = yield call(() => {
    return api.post('Tour')
  })

  const { ok } = response as ApiResponse<boolean>

  if (!ok) {
    toast.error('Erro ao buscar Tour')
  }

  return yield true
}

export default all([
  takeLatest(Actions.GET_TOUR_REQUEST, getUserTour),
  takeLatest(Actions.POST_TOUR_REQUEST, postUserTour)
])
