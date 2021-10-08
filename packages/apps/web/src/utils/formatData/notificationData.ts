import {
  ApiNotification,
  Notification
} from '~/store/modules/notifications/types'

const prepareNotificationData = (history: ApiNotification[]): Notification[] =>
  history.map(notification => ({
    id: notification.id,
    title: notification.titulo,
    url: notification.url,
    message: notification.mensagem,
    source: notification.origem,
    sentDate: notification.dataEnvio,
    expireDate: notification.dataExpiracao
  }))

export default prepareNotificationData
