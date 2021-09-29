export type notificationHistory = notification[]

type notification = {
  origem: string
  mensagem: string
  data: Date
  icone: string
}

export interface NotificationsReducer {
  loading: boolean
  history?: notification[]
}
