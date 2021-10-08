import {
  ApiNotification,
  Notification
} from '~/store/modules/notifications/types'

const prepareNotificationData = (
  history: ApiNotification[]
): Notification[] => {
  return history.map(notification => ({
    id: notification.id,
    title: notification.titulo,
    origin: notification.origem,
    message: notification.mensagem,
    url: notification.url,
    expirationDate: notification.dataExpiracao,
    sentDate: notification.dataEnvio,
    new: false
  }))
}
export default prepareNotificationData
