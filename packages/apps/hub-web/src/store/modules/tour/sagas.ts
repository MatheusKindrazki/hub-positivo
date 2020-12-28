import { all, takeLatest, call, put } from 'redux-saga/effects'

import api from '@hub/api'
import { toast } from '@hub/common/utils'

import { ApiResponse } from 'apisauce'

import { store } from '~/store'

import {
  Actions,
  getTourViewedFailure,
  getTourViewedRequest,
  getTourFailure,
  getTourSuccess,
  getTourViewedSuccess,
  openTour
} from './actions'
import { StepsTour, StepsTourResponseApi } from './types'

const enableFilterLevel = ['PROFESSOR', 'ALUNO']

export function* getTour(): Generator {
  const { viewedLoaded } = store.getState().tour

  if (!viewedLoaded) {
    yield put(getTourViewedRequest())
  }

  const { level } = store.getState().levelEducation
  const { guid } = store.getState().profile
  let query: string

  if (level && enableFilterLevel.includes(guid)) {
    query = `?perfil=${guid}?nivelEnsino=${level}`
  } else {
    query = `?perfil=${guid}`
  }

  const response = yield call(() => {
    return api.get(`/Tour/Steps${query}`)
  })

  const { data, ok } = response as ApiResponse<StepsTourResponseApi[]>
  if (!ok) {
    toast.error('erro ao buscar steps do tour')
    console.error(data)

    return yield put(getTourFailure())
  }

  const prepareTour: StepsTour[] | undefined = data?.map(item => {
    return {
      content: item.conteudo,
      selector: item.seletor,
      position: item.posicao
    }
  })
  return yield put(getTourSuccess(prepareTour))
}

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
  takeLatest(Actions.GET_TOUR_REQUEST, getTour),
  takeLatest(Actions.GET_INFO_VIEWED_REQUEST, getViewed),
  takeLatest(Actions.POST_TOUR, postTour)
])
