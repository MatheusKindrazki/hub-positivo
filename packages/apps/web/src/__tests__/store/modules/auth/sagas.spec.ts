import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import * as profileActions from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import { noBreakAccessEnable } from '~/store/modules/noBreakAccess/actions'
import * as globalActions from '~/store/modules/global/actions'
import * as types from '~/store/modules/auth/types'
import {
  signIn,
  prepareAccess,
  checkingExpiringToken,
  refreshToken
} from '~/store/modules/auth/sagas'
import * as authActions from '~/store/modules/auth/actions'

import { toast } from '@psdhub/common/utils'

import history from '~/services/history'
import * as eemIntegration from '~/services/eemIntegration'
import * as eem from '~/services/eemConnect'

import { userMock, prepareAccessProfileMock, authMock } from '~/__mocks__/store'
import store, { mockState } from '~/__mocks__/fakeStore.mock'
import fakeResponse from '~/__mocks__/api/fakeEemResponse.json'

jest.mock('~/services/eemConnect')
jest.mock('~/services/eemIntegration')
jest.mock('~/middlewares/refreshToken')
jest.mock('~/services/mixpanel/identifyUser')
jest.mock('~/services/mixpanel/clearAll')
jest.mock('@psdhub/common/utils/capitalize')

let dispatchedActions = store.getActions()

const userMockSignIn = {
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
      status?: number
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
        ...userMockSignIn,
        redirect: from
      }) as Payload<types.SignInRequest>

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
          ...userMockSignIn
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
      expect([payloadReturn.info]).toContainObject({
        username: 'john.doe',
        email: 'johndoe@teste.com'
      })

      expect(historyMock).toBeCalledWith('/perfil')
    })

    it('If the Return of the API is flawed for some reason, the user is warned and the login will be rejected', async () => {
      const { messageMock } = await setup({ ok: false })

      expect(eem.EEMConnectPost).toBeCalledWith({
        data: {
          grant_type: 'password',
          ...userMockSignIn
        },
        endpoint: 'connect/token'
      })

      // Verifica chamada do signInFailure
      expect(dispatchedActions).toContainObject(authActions.signInFailure())

      expect(messageMock).toBeCalledWith(
        'Usuário ou senha inválidos, verifique seus dados e tente novamente!'
      )
    })

    it('should enable noobreak when the api returns an error status', async () => {
      const { historyMock } = await setup({
        ok: false,
        status: 500
      })

      expect(eem.EEMConnectPost).toBeCalledWith({
        data: {
          grant_type: 'password',
          ...userMockSignIn
        },
        endpoint: 'connect/token'
      })

      // Verifica inicialização do nobreak
      expect(dispatchedActions).toContainEqual(
        noBreakAccessEnable({ user_login: 'johndoe' })
      )

      expect(historyMock).toHaveBeenCalledWith('/acesso-alternativo')

      expect(dispatchedActions).toContainEqual(authActions.signInFailure())
    })

    it('Should generate with a redirect query in the URL when passing the Redirect parameter in the login', async () => {
      const { historyMock } = await setup({ redirect: '/solucao/test-mock' })

      expect(historyMock).toBeCalledWith('/perfil?redirect=/solucao/test-mock')
    })
  })

  describe('prepare Access', () => {
    const setup = async (data: { guid?: string; redirect?: string }) => {
      const returnedMock = fakeResponse

      const mockedAction = authActions.preparingUserData({
        profiles: prepareAccessProfileMock.profiles,
        selected_profile: prepareAccessProfileMock.selected_profile,
        selected_school: prepareAccessProfileMock.selected_school,
        redirect: data.redirect
      }) as Payload<types.AccessData>

      jest
        .spyOn(eemIntegration, 'changeSchool')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      mockState.user = {
        ...mockState.user,
        school: userMock.school,
        info: {
          ...userMock.user,
          guid: data.guid || userMock.user.guid
        }
      }

      const historyMock = jest.spyOn(history, 'push')
      const messageMock = jest.spyOn(toast, 'error')

      await runSaga(store, prepareAccess, mockedAction).toPromise()

      return { historyMock, messageMock }
    }

    it('Should prepare all data for the first user access', async () => {
      await setup({})

      // Verifica se token reduzindo foi gerado
      expect(dispatchedActions).toContainObject(
        authActions.reducedTokenEEM(authMock.reduced_token)
      )

      // Verifica se perfil de admin foi selecionado
      expect(dispatchedActions).toContainObject(
        profileActions.setProfile({
          guid: 'ADMINISTRADOR',
          name: 'Administrador',
          profile: 'admin',
          colorProfile: 'green'
        })
      )

      // Verifica se os demais perfis foram salvos
      expect(dispatchedActions).toContainObject(
        profileActions.profiles(prepareAccessProfileMock.profiles)
      )

      // Verifica se refresh token da aplicação é ativado
      expect(dispatchedActions).toContainObject(
        globalActions.enableRefreshTokenMiddleware(true)
      )
    })

    it('Should signOut the user if the ID from the reduced token is different from the user ID', async () => {
      const { messageMock } = await setup({ guid: 'invalid-guid' })
      expect(messageMock).toBeCalledWith(
        'Você não tem acesso a escola: Escola Positivo'
      )
      expect(dispatchedActions).toContainObject(authActions.signOut())
    })

    it('Should set the user as authenticated when receiving the redirect parameter', async () => {
      const { historyMock } = await setup({ redirect: '/solucao/teste-mock' })

      expect(dispatchedActions).toContainObject(authActions.setSigned())
      expect(historyMock).toBeCalledWith('/solucao/teste-mock')
    })
  })

  describe('checking Expiring Token', () => {
    it('You should pause running if payload comes empty', async () => {
      const mockedAction = {
        type: 'persist/REHYDRATE',
        payload: undefined as unknown
      } as Payload<types.RehydrateAuth>

      const resolved = await runSaga(
        store,
        checkingExpiringToken,
        mockedAction
      ).result()

      expect(resolved).toBeUndefined()
    })

    it('Should not log the user if it does not have the active login flag', async () => {
      const mockedAction = {
        type: 'persist/REHYDRATE',
        payload: {
          auth: { signed: false, token: 'token' }
        }
      } as Payload<types.RehydrateAuth>

      await runSaga(store, checkingExpiringToken, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(authActions.signOut())
    })

    it('Should return if the expiration date is not defined', async () => {
      const mockedAction = {
        type: 'persist/REHYDRATE',
        payload: {
          auth: {
            exp: 0,
            iat: 10,
            token: 'fake-token',
            signed: true,
            reduced_token: 'fake-reduced-token'
          },
          user: {
            info: {
              guid: 'fake-id'
            }
          }
        }
      } as Payload<types.RehydrateAuth>

      const resolved = await runSaga(
        store,
        checkingExpiringToken,
        mockedAction
      ).toPromise()

      expect(resolved).toBeUndefined()
    })

    it('Should be set, in the reload of the application, the token in the Header of the API if the user is logged in', async () => {
      const mockedAction = {
        type: 'persist/REHYDRATE',
        payload: {
          auth: {
            exp: new Date().getTime() + 10,
            iat: 10,
            token: 'fake-token',
            signed: true,
            reduced_token: 'fake-reduced-token'
          },
          user: {
            info: {
              guid: 'fake-id'
            }
          }
        }
      } as Payload<types.RehydrateAuth>

      await runSaga(store, checkingExpiringToken, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        authActions.reducedTokenEEM('fake-reduced-token')
      )

      expect(dispatchedActions).toContainObject(
        globalActions.enableRefreshTokenMiddleware(true)
      )

      expect(dispatchedActions).toContainObject(productRequest({}))
    })

    it('should refresh the user if the Token expiration date is less than the current date', async () => {
      const mockedAction = {
        type: 'persist/REHYDRATE',
        payload: {
          auth: {
            exp: 10,
            iat: 10,
            token: 'fake-token',
            signed: true,
            reduced_token: 'fake-reduced-token'
          },
          user: {
            info: {
              guid: 'fake-id'
            }
          }
        }
      } as Payload<types.RehydrateAuth>

      await runSaga(store, checkingExpiringToken, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        authActions.refreshTokenRequest()
      )
    })
  })

  describe('refresh Token', () => {
    it('Should generate a new user authentication token for the user', async () => {
      mockState.auth = {
        ...mockState.auth,
        refresh_token: authMock.refresh_token
      }

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: fakeResponse
      }

      jest
        .spyOn(eem, 'EEMConnectPost')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      jest
        .spyOn(eemIntegration, 'changeSchool')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, refreshToken).toPromise()

      expect(dispatchedActions).toContainObject({
        payload: true,
        type: '@global/ENABLE_REFRESH_TOKEN'
      })

      expect(dispatchedActions).toContainObject(productRequest({}))
    })

    it('You should discharge the user if something fails in the return of API', async () => {
      mockState.auth = {
        ...mockState.auth,
        refresh_token: authMock.refresh_token
      }

      const returnedMock = {
        ok: false,
        originalError: null,
        problem: null,
        data: fakeResponse
      }

      jest
        .spyOn(eem, 'EEMConnectPost')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      const mockHistory = jest.spyOn(history, 'push')

      await runSaga(store, refreshToken).toPromise()

      expect(dispatchedActions).toContainObject(authActions.signOut())

      expect(mockHistory).toBeCalledWith('/login')
    })
  })
})
