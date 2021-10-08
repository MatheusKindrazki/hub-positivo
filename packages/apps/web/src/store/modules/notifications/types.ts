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
  source: string
  sentDate: Date
  expireDate: Date
}

export type NotificationHistory = Notification[]

export interface NotificationReducer {
  loading: boolean
  history?: Notification[]
}
