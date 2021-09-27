import { runSaga } from 'redux-saga'

import * as sagas from '~/store/modules/notifications/sagas'
import * as actions from '~/store/modules/notifications/actions'

import { toast } from '@psdhub/common/utils'

import store, { mockState } from '~/__mocks__/fakeStore.mock'
import * as mockedApi from '~/__mocks__/api/fakeNotificationsApi'
let dispatchedActions = store.getActions()

describe('Notifications Sagas should work as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('Should put failure action when theres no user id or token', async () => {
    await runSaga(store, sagas.getNotifications).toPromise()

    expect(dispatchedActions).toContainObject(actions.notificationsFailure())
  })

  it('Should put failure action when API response is flawled', async () => {
    mockState.user = {
      avatar: 'avatar',
      loading: false,
      school: {
        user_id: 'teste',
        label: 'fake-label',
        roles: ['fake-role'],
        value: 'fake-school',
        integration_id: 'fake-id'
      }
    }

    mockState.auth = {
      reduced_token: 'reduced-token',
      refresh_token: 'refresh-token',
      token: 'token',
      exp: 2022,
      loading: false,
      signInStrike: false,
      signed: true,
      withoutAccess: false
    }

    const returnedMock = {
      ok: false,
      data: undefined
    }

    jest
      .spyOn(mockedApi, 'fakeNotificationApi')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    const spyToast = jest.spyOn(toast, 'error')

    await runSaga(store, sagas.getNotifications).toPromise()

    expect(dispatchedActions).toContainObject(actions.notificationsFailure())
    expect(spyToast).toBeCalledWith('Erro ao buscar notificações!')
  })

  it('Should call success action with correct data', async () => {
    const returnedMock = {
      ok: true,
      data: [
        {
          title: 'titulo',
          message: 'mensagem',
          date: new Date(),
          source: 'origem'
        }
      ]
    }

    jest
      .spyOn(mockedApi, 'fakeNotificationApi')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    await runSaga(store, sagas.getNotifications).toPromise()

    expect(dispatchedActions).toContainObject(
      actions.notificationsSuccess(returnedMock.data as any)
    )
  })
})
