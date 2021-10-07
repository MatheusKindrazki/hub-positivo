import * as Yup from 'yup'

import { noticeError } from '@psdhub/newrelic'
import { createSlug, delay } from '@psdhub/common/utils'
import {
  createHubConnect,
  stringSubscriptions,
  HubConnection
} from '@psdhub/api'

interface NotificationConnect<T> {
  (notifications: T): void
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

async function notificationConnect<T = unknown>(
  user: UserInfo,
  token: string,
  data: NotificationConnect<T>
): Promise<void> {
  console.log('brasil')

  await delay(4000)
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

    activeConnection.on(HeaderNotification, data)
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
