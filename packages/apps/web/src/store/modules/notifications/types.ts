import { Payload } from 'redux-saga/effects'

export type ApiNotification = {
  id: string
  titulo: string
  url: string
  mensagem: string
  origem: string
  dataEnvio: Date
  dataExpiracao: Date
}

export type NotificationGetApiResponse = {
  dados: ApiNotification[]
  sucesso: boolean
}

export type Notification = {
  id: string
  title: string
  url: string
  message: string
  origin: string
  sentDate?: Date
  new?: boolean
  expirationDate: Date
}

export type NotificationHistory = Notification[]

export interface NotificationReducer {
  loading: boolean
  history?: Notification[]
}

export type PutNotificationData = {
  notificationIds: string[]
  markAsRead: boolean
}

export type PutNotificationPayload = Payload<PutNotificationData>
