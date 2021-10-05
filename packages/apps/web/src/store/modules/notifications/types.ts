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

export type NotificationApiResponse = {
  dados: NotificationHistory
  sucesso: boolean
}

export interface NotificationReducer {
  loading: boolean
  history?: Notification[]
}
