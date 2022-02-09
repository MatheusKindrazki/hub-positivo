import { ApiErrorResponse, ApiOkResponse } from 'apisauce'

import { AnyAction, Dispatch } from 'redux'

import { RefreshTokenApi } from '~/store/modules/auth/types'
import { store } from '~/store'

import * as HubApi from '@psdhub/api'

import * as api from '~/services/eemConnect'

import refreshToken from '~/middlewares/refreshToken'

jest.mock('mixpanel-browser')

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  decode: jest.fn(() => 1000000000)
}))

jest.mock('@psdhub/api', () => ({
  ...jest.requireActual('@psdhub/api'),
  setAuthorization: jest.fn()
}))

jest.mock('~/store', () => ({
  store: {
    getState: jest
      .fn()

      .mockImplementation(() => ({
        global: {
          enableMiddlewareRefreshToken: true
        }
      })),
    dispatch: jest.fn()
  }
}))

jest.mock('~/services/eemConnect', () => ({
  EEMConnectPost: jest.fn(),
  EEMConnectGET: jest.fn()
}))

describe('RefreshToken should work properly', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockedState = {
    auth: {
      exp: 1000000000,
      refresh_token: 'refresh-token-test',
      reduced_token: 'reduced-token-test'
    }
  }

  const mockedStateExpiredToken = {
    auth: {
      exp: 999999999999,
      refresh_token: 'refresh-token-test',
      reduced_token: 'reduced-token-test'
    }
  }

  const mockedOkApiResponse: ApiOkResponse<RefreshTokenApi> = {
    ok: true,
    problem: null,
    originalError: null,
    data: {
      access_token: 'this-is-a-test-token',
      refresh_token: 'reduced-token-test',
      exp: 0
    }
  }

  const mockedErrorApiResponse: ApiErrorResponse<RefreshTokenApi> = {
    ok: false,
    problem: 'CLIENT_ERROR',
    originalError: {
      name: 'error',
      message: 'an error ocurred',
      config: {},
      isAxiosError: false,
      toJSON: () => ({
        error: true
      })
    },
    data: {
      access_token: null,
      refresh_token: null,
      exp: 0
    }
  }

  const mockDispatch = jest.spyOn(
    store,
    'dispatch'
  ) as unknown as Dispatch<AnyAction>

  it('should dispatch no action when token is expired', async () => {
    jest.spyOn(api, 'EEMConnectPost').mockResolvedValue(mockedErrorApiResponse)

    await refreshToken({
      ...mockedStateExpiredToken.auth,
      dispatch: mockDispatch
    })

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('should dispatch success action when api returns ok true', async () => {
    const refreshTokenAction = {
      payload: false,
      type: '@global/ENABLE_REFRESH_TOKEN'
    }
    const refreshTokenSuccessAction = {
      payload: {
        exp: undefined,
        refresh_token: 'reduced-token-test',
        token: 'reduced-token-test'
      },
      type: '@auth/REFRESH_TOKEN_SUCCESS'
    }

    jest.spyOn(api, 'EEMConnectPost').mockResolvedValue(mockedOkApiResponse)

    await refreshToken({ ...mockedState.auth, dispatch: mockDispatch })

    expect(mockDispatch).toHaveBeenNthCalledWith(1, refreshTokenAction)
    expect(mockDispatch).toHaveBeenNthCalledWith(2, refreshTokenSuccessAction)
  })

  it('should call setHeaders with {"Authorization": "Bearer "} when reduced_token is null', async () => {
    const refreshTokenSuccessAction = {
      payload: {
        exp: undefined,
        refresh_token: 'reduced-token-test',
        token: null
      },
      type: '@auth/REFRESH_TOKEN_SUCCESS'
    }

    jest.spyOn(api, 'EEMConnectPost').mockResolvedValue(mockedOkApiResponse)

    const spySetHeaders = jest.spyOn(HubApi, 'setAuthorization')

    await refreshToken({
      ...mockedState.auth,
      reduced_token: null,
      dispatch: mockDispatch
    })

    expect(spySetHeaders).toHaveBeenCalledWith('', 'all')
    expect(mockDispatch).toHaveBeenNthCalledWith(2, refreshTokenSuccessAction)
  })

  it('should dispatch failure action when api returns ok false', async () => {
    const refreshTokenAction = {
      payload: false,
      type: '@global/ENABLE_REFRESH_TOKEN'
    }
    const refreshTokenFailureAction = { type: '@auth/SIGN_OUT' }

    jest.spyOn(api, 'EEMConnectPost').mockResolvedValue(mockedErrorApiResponse)

    await refreshToken({
      ...mockedState.auth,
      dispatch: mockDispatch
    })

    expect(mockDispatch).toHaveBeenNthCalledWith(1, refreshTokenAction)
    expect(mockDispatch).toHaveBeenNthCalledWith(2, refreshTokenFailureAction)
  })
})
