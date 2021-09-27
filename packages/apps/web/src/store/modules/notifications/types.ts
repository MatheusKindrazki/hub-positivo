export type notificationHistory = notification[]

type notification = {
  title: string
  message: string
  date: Date
  source: string
}

export interface NotificationsReducer {
  loading: boolean
  history?: notification[]
}
