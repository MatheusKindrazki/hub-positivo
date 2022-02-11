import { ApplicationState } from '~/store/store'
import { store } from '~/store'

import * as eemIntegrationService from '~/services/eemIntegration'
import { EEMConnectPost } from '~/services/eemConnect'
import * as EEMConnect from '~/services/eemConnect'

jest.mock('~/services/eemConnect', () => ({
  EEMConnectPost: jest.fn()
}))

const authInitialState = store.getState().auth
const schoolInitialState = store.getState().user.school
const userInitialState = store.getState().user
const storeInitialState = store.getState()

const mockedInitialState = {
  ...storeInitialState,
  auth: {
    ...authInitialState,
    token: 'teste'
  },
  user: {
    ...userInitialState,
    school: {
      ...schoolInitialState,
      value: 'teste'
    }
  }
}

describe('eemIntegration should work properly', () => {
  it('eemIntegration should use store data when no args are received', async () => {
    jest
      .spyOn(EEMConnect, 'EEMConnectPost')
      .mockReturnValue({ data: 'test' } as any)
    jest
      .spyOn(store, 'getState')
      .mockReturnValue(mockedInitialState as ApplicationState)

    const mockedProps = {
      endpoint: 'connect/token',
      data: {
        access_token: mockedInitialState.auth.token,
        school_id: mockedInitialState.user.school.value,
        grant_type: 'change_school'
      }
    }

    const response = await eemIntegrationService.changeSchool()

    expect(EEMConnectPost).toHaveBeenCalledWith(mockedProps)
    expect(response).toStrictEqual('test')
  })
})

describe('connectToEEM function tests', () => {
  const changeSchoolParamsMock = {
    access_token: 'access_token',
    school_id: 'school_id'
  }

  const refreshTokenParamsMock = {
    refresh_token: 'refresh_tokem'
  }

  const SignInParamsMock = {
    username: 'username',
    password: 'password'
  }

  it('Should call EEM api with correct parameters to change user selected school', async () => {
    const spyEEMIntegration = jest.spyOn(EEMConnect, 'EEMConnectPost')

    const { changeSchool } = eemIntegrationService.connectToEEM
    await changeSchool(changeSchoolParamsMock)

    expect(spyEEMIntegration).toHaveBeenCalledWith({
      data: { ...changeSchoolParamsMock, grant_type: 'change_school' },
      endpoint: 'connect/token'
    })
  })

  it('Should call EEM api with correct parameters to refresh user token', async () => {
    const spyEEMIntegration = jest.spyOn(EEMConnect, 'EEMConnectPost')

    const { refreshToken } = eemIntegrationService.connectToEEM
    await refreshToken(refreshTokenParamsMock)

    expect(spyEEMIntegration).toHaveBeenCalledWith({
      data: { ...refreshTokenParamsMock, grant_type: 'refresh_token' },
      endpoint: 'connect/token'
    })
  })

  it('Should call EEM api with correct parameters to login user', async () => {
    const spyEEMIntegration = jest.spyOn(EEMConnect, 'EEMConnectPost')

    const { login } = eemIntegrationService.connectToEEM
    await login(SignInParamsMock)

    expect(spyEEMIntegration).toHaveBeenCalledWith({
      data: { ...SignInParamsMock, grant_type: 'password' },
      endpoint: 'connect/token'
    })
  })
})
