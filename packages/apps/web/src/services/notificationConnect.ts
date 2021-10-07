import * as Yup from 'yup'

import { noticeError } from '@psdhub/newrelic'
import { createSlug } from '@psdhub/common/utils'
import {
  createHubConnect,
  stringSubscriptions,
  HubConnection
} from '@psdhub/api'
export interface NotificationData {
  id: string
  title: string
  message: string
  url: string
  origin: string
  expirationDate: string
  new?: boolean
}

interface NotificationConnect {
  (notifications: NotificationData): void
}

export interface UserInfo {
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

const userSlugCompare = ''

async function notificationConnect(
  user: UserInfo,
  token: string,
  data: NotificationConnect
): Promise<void> {
  try {
    const { HeaderNotification } = stringSubscriptions

    if (!(await notificationSchema.validate(user))) return

    const url = createUrl(user)

    const newUserSlug = createNewUserSlug(user)

    if (newUserSlug === userSlugCompare) return // user already connected

    if (activeConnection) {
      activeConnection.off(HeaderNotification)
    }

    const connect = await createNotificationConnection(url, token)

    activeConnection = connect

    activeConnection.on(
      HeaderNotification,
      (id, title, message, url, origin, expirationDate) =>
        data({ id, title, message, url, origin, expirationDate, new: true })
    )
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
export { notificationConnect }
