import qs from 'qs'
import { ApiResponse } from 'apisauce'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'
import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import { getInstance } from '@psdhub/api'

import prepareNotificationData from '~/utils/formatData/prepareNotificationData'

import { NotificationGetApiResponse, PutNotificationPayload } from './types'
import {
  Actions,
  notificationsFailure,
  notificationsSuccess,
  notificationPutFailure,
  notificationPutSuccess
} from './actions'

export function* getNotifications(): Generator {
  const { profile } = store.getState().profile
  const { level } = store.getState().educationalStage

  if (!profile && !level) {
    return yield put(notificationsFailure())
  }

  const api = getInstance('notification')

  yield put(loading(true))

  const response = yield call(() =>
    api.get('api/notification', {
      perfil: profile,
      nivelEnsino: level,
      aplicacaoDestino: 'PositivoOn'
    })
  )

  const { ok, data } = response as ApiResponse<NotificationGetApiResponse>

  yield put(loading(false))

  if (!ok || !data) {
    toast.error('Erro ao buscar notificações!')
    return yield put(notificationsFailure())
  }

  const formattedNotificationHistory = prepareNotificationData(data.dados)

  return yield put(notificationsSuccess(formattedNotificationHistory))
}

export function* putNotification({
  payload
}: PutNotificationPayload): Generator {
  const { notificationIds, markAsRead } = payload

  const api = getInstance('notification')

  const response = yield call(() =>
    api.put('api/Notification/MarcarLeitura/PositivoOn', null, {
      params: {
        idNotificacao: notificationIds,
        marcarLido: markAsRead
      },
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: 'repeat' })
    })
  )

  const { ok } = response as ApiResponse<NotificationGetApiResponse>

  if (!ok) {
    toast.error('Erro ao mudar o estado da notificação')
    return yield put(notificationPutFailure())
  }

  return yield put(notificationPutSuccess())
}

export default all([
  takeLatest(Actions.GET_REQUEST, getNotifications),
  takeLatest(Actions.PUT_REQUEST, putNotification)
])
