import * as Yup from 'yup'
import { debounce } from 'ts-debounce'
import { parseISO } from 'date-fns'

import { Notification } from '~/store/modules/notifications/types'

import { noticeError } from '@psdhub/newrelic'
import { createSlug } from '@psdhub/common/utils'
import {
  createHubConnect,
  stringSubscriptions,
  HubConnection
} from '@psdhub/api'

interface NotificationConnect {
  (notifications: Notification): void
}
interface NotificationInstance {
  (instance: HubConnection): void
}

interface UserInfo {
  idUsuario: string
  idEscola: string
  perfil: string
  nivelEnsino?: string
}

const notificationSchema = Yup.object().shape({
  idUsuario: Yup.string().uuid().required(),
  idEscola: Yup.string().uuid().required(),
  perfil: Yup.string().required(),
  nivelEnsino: Yup.string()
})

let activeConnection: HubConnection

let userSlugCompare = ''

async function notificationConnectFn(
  user: UserInfo,
  token: string,
  data: NotificationConnect,
  instance?: NotificationInstance
): Promise<void> {
  try {
    const { HeaderNotification } = stringSubscriptions

    if (!(await notificationSchema.validate(user))) return

    const url = createUrl(user)

    const newUserSlug = createNewUserSlug(user)

    if (newUserSlug === userSlugCompare) return // user already connected

    if (activeConnection) {
      activeConnection.off(HeaderNotification)
      activeConnection.stop()
    }

    const connect = await createNotificationConnection(url, token)

    activeConnection = connect
    activeConnection.on(
      HeaderNotification,
      (id, title, message, url, origin, expirationDate) =>
        data({
          id,
          title,
          message,
          url,
          origin,
          expirationDate: parseISO(expirationDate),
          new: true
        })
    )

    userSlugCompare = newUserSlug

    instance && instance(activeConnection)
  } catch (error) {
    noticeError(error as Error)
  }
}

async function createNotificationConnection(
  url: string,
  token: string
): Promise<HubConnection> {
  const connect = await createHubConnect({ url, token })

  return connect
}

function createUrl(data: UserInfo): string {
  const url = new URL(`${process.env.REACT_APP_API_NOTIFICATION}/PositivoOnHub`)

  Object.entries(data).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  )

  return url.toString()
}

function createNewUserSlug(data: UserInfo): string {
  const userString = Object.values(data).join(' ')

  return createSlug(userString)
}

function disconnect(activeConnection?: HubConnection): void {
  if (activeConnection) {
    const { HeaderNotification } = stringSubscriptions

    activeConnection.off(HeaderNotification)
    activeConnection.stop()

    userSlugCompare = ''
  }
}

// Garante que durante o a montagem do componente, a conexão não seja feita duas vezes
const notificationConnect = debounce(notificationConnectFn, 3000)

export type { HubConnection, UserInfo }

export { notificationConnect, disconnect }
