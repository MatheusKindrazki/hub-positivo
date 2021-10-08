import { ApiResponse } from 'apisauce'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'
import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import { getInstance } from '@psdhub/api'

import prepareNotificationData from '~/utils/formatData/prepareNotificationData'

import { NotificationApiResponse } from './types'
import { Actions, notificationsFailure, notificationsSuccess } from './actions'
export function* getNotifications(): Generator {
  const { profile } = store.getState().profile
  const { level } = store.getState().educationalStage

  if (!profile && !level) {
    return yield put(notificationsFailure())
  }

  const api = getInstance('notification')

  yield put(loading(true))

  const response = yield call(() =>
    api.get('notification', {
      perfil: profile,
      nivelEnsino: level,
      aplicacaoDestino: 'PositivoOn'
    })
  )

  const { ok, data } = response as ApiResponse<NotificationApiResponse>

  yield put(loading(false))

  if (!ok || !data) {
    toast.error('Erro ao buscar notificações!')
    return yield put(notificationsFailure())
  }

  const formattedNotificationHistory = prepareNotificationData(data.dados)

  return yield put(notificationsSuccess(formattedNotificationHistory))
}

export default all([takeLatest(Actions.GET_REQUEST, getNotifications)])
