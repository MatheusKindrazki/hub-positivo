import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import { SignInRequest } from '~/store/modules/auth/types'
import { signIn } from '~/store/modules/auth/sagas'
import * as authActions from '~/store/modules/auth/actions'

import history from '~/services/history'
import * as eem from '~/services/eemConnect'

import { dispatchedActions, fakeStore } from '~/__mocks__/fakeStore.mock'
import fakeResponse from '~/__mocks__/fakeEemResponse.json'

jest.mock('~/services/eemConnect')
jest.mock('~/hooks/amplitude/identifyUser')
jest.mock('@hub/common/utils/capitalize')

const userMock = {
  username: 'johndoe',
  password: '123456'
}

describe('Sagas of authentication history', () => {
  it('Should the user authenticate with valid login and password and pass is redirected to choice', async () => {
    const returnedMock = {
      ok: true,
      originalError: null,
      problem: null,
      data: fakeResponse
    }

    const mockedAction = authActions.signInRequest({
      ...userMock,
      redirect: undefined
    }) as Payload<SignInRequest>

    jest
      .spyOn(eem, 'EEMConnectPost')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    const historyMock = jest.spyOn(history, 'push')

    await runSaga(fakeStore, signIn, mockedAction)

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
    const returnedMock = {
      ok: false,
      originalError: null,
      problem: null,
      data: {}
    }

    const mockedAction = authActions.signInRequest({
      ...userMock,
      redirect: undefined
    }) as Payload<SignInRequest>

    jest
      .spyOn(eem, 'EEMConnectPost')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    await runSaga(fakeStore, signIn, mockedAction)

    await expect(eem.EEMConnectPost).toBeCalledWith({
      data: {
        grant_type: 'password',
        ...userMock
      },
      endpoint: 'connect/token'
    })
    // Verifica chamada do loading
    expect(dispatchedActions).toContainObject(authActions.signInFailure())
  })
})
