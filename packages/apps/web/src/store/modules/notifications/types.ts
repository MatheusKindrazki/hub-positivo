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

export type NotificationApiResponse = {
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

export type PutNotificationPayload = Payload<{ notificationId: string }>
