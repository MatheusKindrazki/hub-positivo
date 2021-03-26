import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import * as types from '~/store/modules/user/types'
import * as sagas from '~/store/modules/user/sagas'
import * as userActions from '~/store/modules/user/actions'

import { apiEEMAuth } from '@hub/api'

import store, { mockState } from '~/__mocks__/fakeStore.mock'

jest.mock('~/services/eemConnect')

let dispatchedActions = store.getActions()

describe('Sagas of user history', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  describe('forgot Password', () => {
    it('', async () => {
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

      jest
        .spyOn(apiEEMAuth, 'post')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.forgotPassword, mockedAction).toPromise()
    })
  })
})
