import { runSaga } from 'redux-saga'

import * as sagas from '~/store/modules/notifications/sagas'
import * as actions from '~/store/modules/notifications/actions'

import { toast } from '@psdhub/common/utils'
import * as api from '@psdhub/api'

import prepareNotificationData from '~/utils/formatData/notificationData'

import store, { mockState } from '~/__mocks__/fakeStore.mock'
let dispatchedActions = store.getActions()

jest.mock('@psdhub/api', () => {
  return {
    ...jest.requireActual('@psdhub/api'),
    getInstance: jest.fn()
  }
})

describe('Notifications Sagas should work as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('Should put failure action when theres no user profile or educationalLevel', async () => {
    mockState.profile = {
      profile: undefined
    } as any

    mockState.educationalStage = {
      level: undefined
    } as any

    jest.spyOn(api, 'getInstance').mockReturnValue({ get: jest.fn() } as any)

    await runSaga(store, sagas.getNotifications).toPromise()

    expect(dispatchedActions).toContainObject(actions.notificationsFailure())
  })

  it('Should put failure action when API response is flawled', async () => {
    mockState.profile = {
      profile: 'fake profile'
    } as any

    mockState.educationalStage = {
      level: 'fake-level'
    } as any

    const returnedMock = {
      ok: false,
      data: undefined
    }

    const mockedGet = jest.fn(() => Promise.resolve<any>(returnedMock))

    jest.spyOn(api, 'getInstance').mockReturnValue({ get: mockedGet } as any)

    const spyToast = jest.spyOn(toast, 'error')

    await runSaga(store, sagas.getNotifications).toPromise()

    expect(dispatchedActions).toContainObject(actions.notificationsFailure())
    expect(spyToast).toBeCalledWith('Erro ao buscar notificações!')
  })

  it('Should call success action with correct data', async () => {
    const returnedMock = {
      ok: true,
      data: {
        dados: [
          {
            id: 'fake-id',
            titulo: 'fake-title',
            url: 'https://fake-url.com',
            mensagem: 'this is a fake message',
            origem: 'fak-source',
            dataEnvio: new Date(),
            dataExpiracao: new Date()
          }
        ]
      }
    }

    const expectedPayload = prepareNotificationData(returnedMock.data.dados)

    const mockedGet = jest.fn(() => Promise.resolve<any>(returnedMock))

    jest.spyOn(api, 'getInstance').mockReturnValue({ get: mockedGet } as any)

    await runSaga(store, sagas.getNotifications).toPromise()

    expect(dispatchedActions).toContainObject(
      actions.notificationsSuccess(expectedPayload)
    )
  })
})
