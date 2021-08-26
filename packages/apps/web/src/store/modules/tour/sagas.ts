import { ApiResponse } from 'apisauce'

import { all, takeLatest, call, put } from 'redux-saga/effects'

import { store } from '~/store'

import { getInstance } from '@psdhub/api'

import { StepsTour, StepsTourResponseApi } from './types'
import {
  Actions,
  getTourViewedFailure,
  getTourViewedRequest,
  getTourFailure,
  getTourSuccess,
  getTourViewedSuccess,
  openTour
} from './actions'

const enableFilterLevel = ['PROFESSOR', 'ALUNO']

export function* getTour(): Generator {
  const { viewedLoaded } = store.getState().tour

  if (!viewedLoaded) {
    yield put(getTourViewedRequest())
  }

  const { level } = store.getState().educationalStage
  const { guid } = store.getState().profile
  let query: string

  if (level && enableFilterLevel.includes(guid)) {
    query = `?perfil=${guid}&nivelEnsino=${level}`
  } else {
    query = `?perfil=${guid}`
  }

  const api = getInstance('default')

  const response = yield call(() => {
    return api.get(`/Tour/Steps${query}`)
  })

  const { data, ok } = response as ApiResponse<StepsTourResponseApi[]>
  if (!ok) {
    console.error(data)

    return yield put(getTourFailure())
  }

  const prepareTour: StepsTour[] | undefined = data?.map(item => {
    return {
      content: item.conteudo,
      selector: item.seletor
    }
  })
  return yield put(getTourSuccess(prepareTour))
}

export function* getViewed(): Generator {
  const api = getInstance('default')

  const response = yield call(() => {
    return api.get('/Tour')
  })

  const { data, ok } = response as ApiResponse<boolean>
  if (!ok) {
    console.error(data)

    return yield put(getTourViewedFailure())
  }
  return yield put(getTourViewedSuccess({ viewed: data as boolean }))
}

export function* postTour(): Generator {
  const api = getInstance('default')

  yield put(openTour(false))

  const { guid } = store.getState().profile
  const response = yield call(() => {
    return api.post('/Tour', `"${guid}"`)
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
