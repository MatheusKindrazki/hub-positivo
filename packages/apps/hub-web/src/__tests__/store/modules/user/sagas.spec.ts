import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import * as types from '~/store/modules/user/types'
import * as sagas from '~/store/modules/user/sagas'
import * as userActions from '~/store/modules/user/actions'

import { toast } from '@hub/common/utils'
import { apiEEMAuth } from '@hub/api'

import history from '~/services/history'

import store from '~/__mocks__/fakeStore.mock'

jest.mock('~/services/eemConnect')

let dispatchedActions = store.getActions()

describe('Sagas of user history', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  describe('Forgot Password', () => {
    it('Should shoot a message to the user and redirect it to login to API success', async () => {
      const mockedAction = userActions.forgotPasswordRequest({
        newPassword: '123456',
        pin: '123'
      }) as Payload<types.UserAlterPass>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: true
      }
      const mockToast = jest.spyOn(toast, 'success')
      const mockHistory = jest.spyOn(history, 'push')

      jest
        .spyOn(apiEEMAuth, 'put')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.forgotPassword, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        userActions.forgotPasswordSuccess()
      )
      expect(mockToast).toBeCalledWith('Senha Alterada com sucesso!')
      expect(mockHistory).toBeCalledWith('/login')
    })

    it('Should shoot an error message for user if the API returns some exception', async () => {
      const mockedAction = userActions.forgotPasswordRequest({
        newPassword: '123456',
        pin: '123'
      }) as Payload<types.UserAlterPass>

      const returnedMock = {
        ok: false,
        originalError: null,
        problem: null,
        data: false
      }
      const mockToast = jest.spyOn(toast, 'error')

      jest
        .spyOn(apiEEMAuth, 'put')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.forgotPassword, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        userActions.forgotPasswordFailure()
      )
      expect(mockToast).toBeCalledWith(
        'Erro ao alterar a sua senha, tente novamente mais tarde!'
      )
    })

    it('Should return a custom error message if the password or PIN PASSE INVALIDS', async () => {
      const mockedAction = userActions.forgotPasswordRequest({
        newPassword: '123123',
        pin: ''
      }) as Payload<types.UserAlterPass>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: {
          error: true,
          errorMessage: 'Pin inválido'
        }
      }
      const mockToast = jest.spyOn(toast, 'error')

      jest
        .spyOn(apiEEMAuth, 'put')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.forgotPassword, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        userActions.forgotPasswordFailure()
      )
      expect(mockToast).toBeCalledWith('Pin inválido')
    })

    it('Should return the default error message if the invalid password or password PIN and the API does not contain a response', async () => {
      const mockedAction = userActions.forgotPasswordRequest({
        newPassword: '123123',
        pin: ''
      }) as Payload<types.UserAlterPass>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: {
          error: true
        }
      }
      const mockToast = jest.spyOn(toast, 'error')

      jest
        .spyOn(apiEEMAuth, 'put')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.forgotPassword, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        userActions.forgotPasswordFailure()
      )
      expect(mockToast).toBeCalledWith(
        'Erro ao alterar a sua senha, verifique seus dados e tente novamente!'
      )
    })
  })

  describe('Alter Password', () => {
    it('Should shoot a successful message for user in the return of API', async () => {
      const mockedAction = userActions.alterPasswordRequest({
        newPassword: '123456',
        oldPassword: '123'
      }) as Payload<types.UserAlterPassPanel>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: true
      }

      const mockToast = jest.spyOn(toast, 'success')

      jest
        .spyOn(apiEEMAuth, 'put')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.alterPasswordPanel, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        userActions.alterPasswordSuccess()
      )
      expect(mockToast).toBeCalledWith('Senha Alterada com sucesso!')
    })

    it('Should shoot an error message for user if the API returns some exception', async () => {
      const mockedAction = userActions.alterPasswordRequest({
        newPassword: '123456',
        oldPassword: '123'
      }) as Payload<types.UserAlterPassPanel>

      const returnedMock = {
        ok: false,
        originalError: null,
        problem: null,
        data: false
      }
      const mockToast = jest.spyOn(toast, 'error')

      jest
        .spyOn(apiEEMAuth, 'put')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.alterPasswordPanel, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        userActions.alterPasswordFailure()
      )
      expect(mockToast).toBeCalledWith(
        'Erro ao alterar a sua senha, tente novamente mais tarde!'
      )
    })

    it('Should return a custom error message if the password or PIN PASSE INVALIDS', async () => {
      const mockedAction = userActions.alterPasswordRequest({
        newPassword: '123456',
        oldPassword: '123'
      }) as Payload<types.UserAlterPassPanel>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: {
          error: true,
          errorMessage: 'Sua senha atual não pode ser igual a anterior'
        }
      }
      const mockToast = jest.spyOn(toast, 'error')

      jest
        .spyOn(apiEEMAuth, 'put')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.alterPasswordPanel, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        userActions.alterPasswordFailure()
      )
      expect(mockToast).toBeCalledWith(
        'Sua senha atual não pode ser igual a anterior'
      )
    })

    it('Should return the default error message if the invalid password the API does not contain a response', async () => {
      const mockedAction = userActions.alterPasswordRequest({
        newPassword: '123456',
        oldPassword: '123'
      }) as Payload<types.UserAlterPassPanel>

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: {
          error: true
        }
      }
      const mockToast = jest.spyOn(toast, 'error')

      jest
        .spyOn(apiEEMAuth, 'put')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.alterPasswordPanel, mockedAction).toPromise()

      expect(dispatchedActions).toContainObject(
        userActions.alterPasswordFailure()
      )
      expect(mockToast).toBeCalledWith(
        'Erro ao alterar a sua senha, verifique seus dados e tente novamente!'
      )
    })
  })
})
