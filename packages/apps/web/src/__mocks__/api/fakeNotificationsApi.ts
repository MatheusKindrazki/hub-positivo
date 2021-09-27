import fakeApiNotificationResponse from './fakeApiNotificationsResponse.json'

type dataType = typeof fakeApiNotificationResponse

const fakeNotificationApi = (
  success: boolean,
  timeout?: number
): Promise<dataType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(fakeApiNotificationResponse)
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ ok: false, data: undefined })
      }
    }, timeout || 500)
  })
}

export default fakeNotificationApi
