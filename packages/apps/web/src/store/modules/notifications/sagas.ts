import { ApiResponse } from 'apisauce'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'
import { store } from '~/store'

import { fakeNotificationApi } from '@psdhub/web/src/__mocks__/api/fakeNotificationsApi'
import { toast } from '@psdhub/common/utils'

import { notificationHistory } from './types'
import { Actions, notificationsFailure, notificationsSuccess } from './actions'
export function* getNotifications(): Generator {
  const { school } = store.getState().user
  const { reduced_token } = store.getState().auth

  if (!school?.user_id || !reduced_token) {
    return yield put(notificationsFailure())
  }

  yield put(loading(true))

  const failChance = Math.random() > 0.9
  const response = yield call(() => fakeNotificationApi(failChance))

  const { ok, data } = response as ApiResponse<notificationHistory[]>
  yield put(loading(false))

  if (!ok || !data) {
    toast.error('Erro ao buscar notificações!')
    return yield put(notificationsFailure())
  }

  return yield put(notificationsSuccess(data))
}

export default all([takeLatest(Actions.GET_REQUEST, getNotifications)])
