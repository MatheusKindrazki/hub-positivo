import { runSaga } from 'redux-saga'

import * as sagas from '~/store/modules/notifications/sagas'
import * as actions from '~/store/modules/notifications/actions'
import { loading } from '~/store/modules/global/actions'

import * as api from '@psdhub/api'

import prepareNotificationData from '~/utils/formatData/prepareNotificationData'

import store from '~/__mocks__/fakeStore.mock'

jest.mock('@psdhub/api')

const mockedNotificationHistory = {
  dados: [
    {
      id: 'string',
      titulo: 'string',
      url: 'string',
      mensagem: 'string',
      origem: 'string',
      dataEnvio: new Date(),
      dataExpiracao: new Date()
    },
    {
      id: 'string',
      titulo: 'string',
      url: 'string',
      mensagem: 'string',
      origem: 'string',
      dataEnvio: new Date(),
      dataExpiracao: new Date()
    }
  ]
}

const mockedGet = jest.fn()
const mockedPut = jest.fn()

jest.spyOn(api, 'getInstance').mockReturnValue({
  get: mockedGet,
  put: mockedPut
} as any)

let dispatchedActions = store.getActions()

describe('Notifications sagas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()
    dispatchedActions = store.getActions()
  })

  it('getNotifications should toggle loading, fetch data and dispatch success message', async () => {
    const returnedMock = {
      ok: true,
      originalError: null,
      problem: null,
      data: mockedNotificationHistory
    }

    const { dados } = mockedNotificationHistory

    const formattedData = prepareNotificationData(dados)

    mockedGet.mockReturnValueOnce(returnedMock)

    await runSaga(store, sagas.getNotifications).toPromise()

    expect(mockedGet).toHaveBeenCalled()
    expect(dispatchedActions).toEqual([
      loading(true),
      loading(false),
      actions.notificationsSuccess(formattedData)
    ])
  })

  it('getNotifications should toggle loading, fetch data and dispatch failure action when api returns with an error', async () => {
    const returnedMock = {
      ok: false,
      originalError: null,
      problem: null
    }

    mockedGet.mockReturnValueOnce(returnedMock)

    await runSaga(store, sagas.getNotifications).toPromise()

    expect(mockedGet).toHaveBeenCalled()
    expect(dispatchedActions).toEqual([
      loading(true),
      loading(false),
      actions.notificationsFailure()
    ])
  })

  it('getNotifications should dispatch failure action when theres no user info', async () => {
    jest
      .spyOn(store, 'getState')
      .mockReturnValueOnce({ profile: { profile: undefined } } as any)
      .mockReturnValueOnce({ educationalStage: { level: '' } } as any)

    await runSaga(store, sagas.getNotifications).toPromise()

    expect(dispatchedActions).toEqual([actions.notificationsFailure()])
  })

  it('putNotifications should send put request and dispatch success message', async () => {
    const returnedMock = {
      ok: true
    }

    mockedPut.mockReturnValueOnce(returnedMock)

    const action = actions.notificationPutRequest({
      notificationIds: ['id'],
      markAsRead: true
    })

    await runSaga(store, sagas.putNotification, action as any).toPromise()

    expect(mockedPut).toHaveBeenCalled()
    expect(dispatchedActions).toEqual([actions.notificationPutSuccess()])
  })

  it('putNotifications should send put request and dispatch failure action when api returns with an error', async () => {
    const returnedMock = {
      ok: false
    }

    mockedPut.mockReturnValueOnce(returnedMock)

    const action = actions.notificationPutRequest({
      notificationIds: ['id'],
      markAsRead: true
    })

    await runSaga(store, sagas.putNotification, action as any).toPromise()

    expect(mockedPut).toHaveBeenCalled()
    expect(dispatchedActions).toEqual([actions.notificationPutFailure()])
  })
})
