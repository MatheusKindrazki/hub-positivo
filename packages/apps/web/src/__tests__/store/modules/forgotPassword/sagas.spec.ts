import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import * as types from '~/store/modules/forgotPassword/types'
import * as sagas from '~/store/modules/forgotPassword/sagas'
import * as actions from '~/store/modules/forgotPassword/actions'

import { toast } from '@psdhub/common/utils'
import { apiEEMAuth } from '@psdhub/api'

import history from '~/services/history'

import store from '~/__mocks__/fakeStore.mock'

let dispatchedActions = store.getActions()

describe('Sagas of forgotPassword history', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  describe('pwd Token', () => {
    it('Should show a message to the user and redirect it to login to API success', async () => {
      const mockedAction = actions.pwdTokenRequest({
        userInfo: 'John Doe'
      }) as Payload<types.PwdTokenRequest>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: true
      }

      jest
        .spyOn(apiEEMAuth, 'post')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      const mockToast = jest.spyOn(toast, 'info')
      const mockHistory = jest.spyOn(history, 'push')

      await runSaga(store, sagas.pwdToken, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(actions.pwdTokenSuccess())
      expect(mockHistory).toBeCalledWith('/login')
      expect(mockToast).toBeCalledWith(
        'Um link para recuperação de senha foi enviado para seu email ou celular'
      )
    })

    it('Should send the user to the failure page if the return of the API is flawed', async () => {
      const mockedAction = actions.pwdTokenRequest({
        userInfo: 'John Doe'
      }) as Payload<types.PwdTokenRequest>

      const returnedMock = {
        ok: false,
        originalError: null,
        problem: null,
        data: true
      }

      jest
        .spyOn(apiEEMAuth, 'post')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      const mockHistory = jest.spyOn(history, 'push')

      await runSaga(store, sagas.pwdToken, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(actions.pwdTokenFailure())
      expect(mockHistory).toBeCalledWith('/esqueci-minha-senha/falhou')
    })

    it('Show an error message for the user if the API returns an exception', async () => {
      const mockedAction = actions.pwdTokenRequest({
        userInfo: 'John Doe'
      }) as Payload<types.PwdTokenRequest>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: {
          error: true
        }
      }

      jest
        .spyOn(apiEEMAuth, 'post')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      const mockToast = jest.spyOn(toast, 'error')

      await runSaga(store, sagas.pwdToken, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(actions.pwdTokenFailure())

      expect(mockToast).toBeCalledWith('Erro ao verificar usuário')
    })
  })

  describe('validate PIN', () => {
    it('Should Validate User PIN via API', async () => {
      const mockedAction = actions.validatePinRequest({
        pin: '1234'
      }) as Payload<types.ValidatePin>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: {
          content: true
        }
      }

      jest
        .spyOn(apiEEMAuth, 'post')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.validatePIN, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        actions.validatePinSuccess(true)
      )
    })

    it('Show for the user that the token is expired or invalid', async () => {
      const mockedAction = actions.validatePinRequest({
        pin: 'non-valid-pin'
      }) as Payload<types.ValidatePin>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: {
          content: false
        }
      }

      jest
        .spyOn(apiEEMAuth, 'post')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      const mockHistory = jest.spyOn(history, 'push')

      await runSaga(store, sagas.validatePIN, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        actions.validatePinSuccess(false)
      )
      expect(mockHistory).lastCalledWith('/token-expirado')
    })

    it('Show an error message for the user if the API returns an exception', async () => {
      const mockedAction = actions.validatePinRequest({
        pin: '1234'
      }) as Payload<types.ValidatePin>

      const returnedMock = {
        ok: false,
        originalError: null,
        problem: null,
        data: {}
      }

      jest
        .spyOn(apiEEMAuth, 'post')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      const mockToast = jest.spyOn(toast, 'error')

      await runSaga(store, sagas.validatePIN, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(actions.validatePinFailure())
      expect(mockToast).lastCalledWith(
        'Ocorreu um erro ao validar seu pin, tente novamente mais tarde!'
      )
    })
  })
})
