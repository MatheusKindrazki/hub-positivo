export type NotificationHistory = Notification[]

export type Notification = {
  id: string
  titulo: string
  url: string
  mensagem: string
  origem: string
  dataEnvio: Date
  dataExpiracao: Date
  icone: string
}

export interface NotificationsReducer {
  loading: boolean
  history?: Notification[]
}
