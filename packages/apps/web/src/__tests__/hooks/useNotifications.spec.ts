import { renderHook } from '@testing-library/react-hooks'

import * as Redux from 'react-redux'

import { notificationsRequest } from '~/store/modules/notifications/actions'

import { waitFor } from '@psdhub/test-utils'

import * as Services from '~/services/notificationConnect'

import useNotifications from '~/hooks/useNotifications'

const mockedState = {
  auth: { reduced_token: 'fake-reduced-token' },
  educationalStage: { level: 'fake-level' },
  notifications: {
    loading: false,
    history: [
      {
        id: 'notification-id',
        title: 'Notification Title',
        url: 'notification-url',
        message: 'fake message',
        origin: 'source',
        expirationDate: new Date(),
        new: false
      }
    ]
  },
  profile: { guid: 'PROFESSOR' },
  user: { info: { guid: 'fake-user-guid' }, school: { value: 'school-value' } }
}
describe('useNotifications should work as expected', () => {
  afterEach(() => jest.clearAllMocks())

  const mockedDispatch = jest.fn()
  const mockedNotificationConnect = jest.fn(
    (user, token, getData, getInstance) => {
      getData()
      getInstance()
    }
  )
  const mockedDisconnect = jest.fn()

  jest
    .spyOn(Redux, 'useDispatch')
    .mockImplementation(() => mockedDispatch as any)

  jest
    .spyOn(Redux, 'useSelector')
    .mockImplementation(selector => selector(mockedState))

  jest
    .spyOn(Services, 'notificationConnect')
    .mockImplementation(mockedNotificationConnect)

  jest.spyOn(Services, 'disconnect').mockImplementation(mockedDisconnect)

  it('useNotifications should request notifications', async () => {
    await waitFor(() => renderHook(async () => useNotifications()))

    expect(mockedDispatch).toHaveBeenCalledWith(notificationsRequest())

    expect(mockedNotificationConnect).toHaveBeenCalledWith(
      {
        idEscola: 'school-value',
        idUsuario: 'fake-user-guid',
        nivelEnsino: 'fake-level',
        perfil: 'PROFESSOR'
      },
      'fake-reduced-token',
      expect.anything(),
      expect.anything()
    )
  })
  it('useNotifications shouldnt call notificationConnect when loading is true', async () => {
    const newState = mockedState
    newState.notifications.loading = true
    newState.notifications.history = null as any
    jest
      .spyOn(Redux, 'useSelector')
      .mockImplementationOnce(selector => selector(newState))

    await waitFor(() => renderHook(async () => useNotifications()))

    expect(mockedNotificationConnect).not.toHaveBeenCalled()
  })
})
