import { Notification } from '~/store/modules/notifications/types'

import * as utils from '@psdhub/common/utils'
import * as api from '@psdhub/api'

import {
  HubConnection,
  notificationConnect,
  disconnect
} from '~/services/notificationConnect'

jest.mock('@psdhub/api')

jest.mock('@psdhub/newrelic')

jest.mock('yup', () => ({
  object: () => ({
    shape: () => ({ validate: (e: string) => !!e })
  }),
  string: () => ({
    required: () => '',
    uuid: () => ({
      required: () => ''
    })
  })
}))

jest.mock('ts-debounce', () => {
  const rest = jest.requireActual('ts-debounce')
  return {
    ...rest,
    debounce:
    /* eslint-disable */

        (callbackFunction: any) =>
        (...e: any) =>
          callbackFunction(...e)
    /* eslint-enable */
  }
})

const mockedUser = {
  idUsuario: 'a6f60cba-84fb-11ec-a8a3-0242ac120002',
  idEscola: 'a6f60cba-84fb-11ec-a8a3-0242ac120002',
  perfil: 'string',
  nivelEnsino: 'string'
}

const mockedToken = 'token'

let currentMessages: Notification[]

const mockedData = (notifications: Notification) => {
  currentMessages = notifications as any
  console.log({ currentMessages })
}

let activeInstance: HubConnection

const mockedInstance = (instance: HubConnection) => {
  activeInstance = instance
  console.log(activeInstance.state)
}

describe('notificationConnect services', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  process.env = Object.assign(process.env, {
    REACT_APP_API_NOTIFICATION: 'https://fake-api.com'
  })

  const mockedOn = jest.fn((message: string, callback) => {
    console.log(message)
    callback()
  })
  const mockedOff = jest.fn()
  const mockedStop = jest.fn()

  const mockedCreateHubConnect = jest.fn(() => ({
    on: mockedOn,
    off: mockedOff,
    stop: mockedStop
  }))

  jest
    .spyOn(api, 'createHubConnect')
    .mockImplementation(mockedCreateHubConnect as any)

  it('notificationConnect should early return when user is already connected or validation returns falsy', async () => {
    jest.spyOn(utils, 'createSlug').mockReturnValueOnce('')

    await notificationConnect(
      mockedUser,
      mockedToken,
      mockedData,
      mockedInstance
    )

    // forcing validation to return falsy
    await notificationConnect(
      undefined as any,
      mockedToken,
      mockedData,
      mockedInstance
    )
    expect(mockedCreateHubConnect).not.toHaveBeenCalled()
  })

  it('notificationConnect should create connection', async () => {
    await notificationConnect(
      mockedUser,
      mockedToken,
      mockedData,
      mockedInstance
    )
    expect(mockedCreateHubConnect).toHaveBeenCalled()
  })

  it('disconnect should end connection', async () => {
    const mockedConnection = {
      off: mockedOff,
      stop: mockedStop
    } as unknown as HubConnection

    disconnect(mockedConnection)

    expect(mockedOff).toHaveBeenCalled()
    expect(mockedStop).toHaveBeenCalled()
  })
})
