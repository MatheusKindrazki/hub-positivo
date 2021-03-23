import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import { AccessData, SignInRequest } from '~/store/modules/auth/types'
import { signIn, prepareAccess } from '~/store/modules/auth/sagas'
import * as authActions from '~/store/modules/auth/actions'

import { toast } from '@hub/common/utils'

import history from '~/services/history'
import * as eemIntegration from '~/services/eemIntegration'
import * as eem from '~/services/eemConnect'

import store, { mockState } from '~/__mocks__/fakeStore.mock'
import fakeResponse from '~/__mocks__/fakeEemResponse.json'

jest.mock('~/services/eemConnect')
jest.mock('~/services/eemIntegration')
jest.mock('~/middlewares/refreshToken')
jest.mock('~/hooks/amplitude/identifyUser')
jest.mock('@hub/common/utils/capitalize')

let dispatchedActions = store.getActions()

const userMock = {
  username: 'johndoe',
  password: '123456'
}

describe('Sagas of authentication history', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  describe('sign in', () => {
    const setup = async (data: {
      ok?: boolean
      data?: object | []
      redirect?: string
    }) => {
      const from = data.redirect

      delete data.redirect

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: fakeResponse,
        ...data
      }

      const mockedAction = authActions.signInRequest({
        ...userMock,
        redirect: from
      }) as Payload<SignInRequest>

      jest
        .spyOn(eem, 'EEMConnectPost')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      const historyMock = jest.spyOn(history, 'push')
      const messageMock = jest.spyOn(toast, 'error')

      await runSaga(store, signIn, mockedAction).toPromise()

      return { historyMock, messageMock }
    }

    it('Should the user authenticate with valid login and password and pass is redirected to choice', async () => {
      const { historyMock } = await setup({})

      await expect(eem.EEMConnectPost).toBeCalledWith({
        data: {
          grant_type: 'password',
          ...userMock
        },
        endpoint: 'connect/token'
      })

      const payloadReturn = dispatchedActions[1].payload

      // Verifica chamada do loading
      expect(dispatchedActions).toContainObject(
        authActions.signInRequestLoading()
      )

      // Verifica chamada do signInSuccess
      expect(dispatchedActions).toContainObject(
        authActions.signInSuccess(payloadReturn)
      )

      expect([payloadReturn.user]).toContainObject({
        username: 'john.doe',
        email: 'johndoe@teste.com'
      })

      expect(historyMock).toBeCalledWith('/perfil')
    })

    it('If the Return of the API is flawed for some reason, the user is warned and the login will be rejected', async () => {
      const { messageMock } = await setup({ ok: false })

      await expect(eem.EEMConnectPost).toBeCalledWith({
        data: {
          grant_type: 'password',
          ...userMock
        },
        endpoint: 'connect/token'
      })

      // Verifica chamada do signInFailure
      expect(dispatchedActions).toContainObject(authActions.signInFailure())

      expect(messageMock).toBeCalledWith(
        'Usuário ou senha inválidos, verifique seus dados e tente novamente!'
      )
    })

    it('Should generate with a redirect query in the URL when passing the Redirect parameter in the login', async () => {
      const { historyMock } = await setup({ redirect: '/solucao/test-mock' })

      expect(historyMock).toBeCalledWith('/perfil?redirect=/solucao/test-mock')
    })
  })

  describe('prepare Access', () => {
    it.skip('Should prepare all data for the first user access', async () => {
      const returnedMock = fakeResponse

      const mockedAction = authActions.preparingUserData({
        selected_school: {
          id: 'fake-guid-id',
          user_id: undefined,
          integration_id: undefined,
          time_zone: undefined,
          name: 'Positivo Soluções',
          roles: ['Admin', 'Prof'],
          label: 'PSD',
          value: 'psd'
        },
        selected_profile: {
          id: 'fake-guid-id',
          name: 'Administrator',
          icon: 'admin',
          colorProfile: 'green'
        },
        profiles: [
          {
            id: 'fake-guid-id',
            name: 'Administrator',
            icon: 'admin',
            colorProfile: 'green'
          }
        ],
        redirect: undefined
      }) as Payload<AccessData>

      jest
        .spyOn(eemIntegration, 'changeSchool')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      mockState.user = {
        ...mockState.user,
        user: {
          name: 'Mandela',
          email: 'asd@gmail.com',
          username: 'asd',
          guid: '123'
        }
      }

      const historyMock = jest.spyOn(history, 'push')
      const messageMock = jest.spyOn(toast, 'error')

      await runSaga(store, prepareAccess, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(authActions.signOut())
      // expect(messageMock).toBeCalledWith(
      //   'Você não tem acesso a escola: Positivo Soluções'
      // )
    })
  })
})
