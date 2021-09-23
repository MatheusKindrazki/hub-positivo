import { createHubConnect, stringSubscriptions } from '@psdhub/api'

interface NotificationConnect<T> {
  (notifications: T): void
}

interface UserInfo {
  idUsuario: string
  idEscola: string
  perfil: string
  nivelEnsino?: string
}

async function notificationConnect<T = unknown>(
  user: UserInfo,
  data: NotificationConnect<T>
): Promise<void> {
  try {
    const url = new URL(`${process.env.REACT_APP_API_SIGNALR}/PositivoOnHub`)

    Object.entries(user).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    )

    const { HeaderNotification } = stringSubscriptions

    const connect = await createHubConnect({ url: url.toString() })

    connect.on(HeaderNotification, message => data(message))
  } catch (error) {
    console.error(error)
  }
}
export { notificationConnect }
