import { ApiErrorResponse, ApiOkResponse } from 'apisauce'
import { waitFor } from '@testing-library/react'

import { RefreshTokenApi } from '~/store/modules/auth/types'
import { store } from '~/store'

import hubApi from '@psdhub/api'

import history from '~/services/history'
import * as api from '~/services/eemConnect'

import refreshToken from '~/middlewares/refreshToken'

const mockedState = {
  auth: {
    exp: 1,
    refresh_token: 'refresh-token-test'
  },
  global: {
    enableMiddlewareRefreshToken: true
  }
}

const mockedStateExpiredToken = {
  auth: {
    exp: 999999999999,
    refresh_token: 'refresh-token-test'
  },
  global: {
    enableMiddlewareRefreshToken: true
  }
}

const mockedOkApiResponse: ApiOkResponse<RefreshTokenApi> = {
  ok: true,
  problem: null,
  originalError: null,
  data: {
    access_token: 'this-is-a-test-token',
    refresh_token: 'test-refresh-token',
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

jest.mock('~/store', () => ({
  store: {
    getState: jest
      .fn()
      .mockImplementationOnce(() => mockedStateExpiredToken)
      .mockImplementation(() => mockedState),
    dispatch: jest.fn()
  }
}))
jest.mock('~/services/history', () => ({
  push: jest.fn()
}))
jest.mock('~/services/eemConnect', () => ({
  EEMConnectPost: jest.fn(),
  EEMConnectGET: jest.fn()
}))

describe('RefreshToken should work properly', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should dispatch no action when token is expired', async () => {
    const spyDispatch = jest.spyOn(store, 'dispatch')

    jest.spyOn(api, 'EEMConnectPost').mockResolvedValue(mockedErrorApiResponse)

    refreshToken()

    await waitFor(() => {
      expect(spyDispatch).not.toHaveBeenCalled()
    })
  })

  it('should dispatch success action when api returns ok true', async () => {
    const refreshTokenAction = {
      payload: false,
      type: '@global/ENABLE_REFRESH_TOKEN'
    }
    const refreshTokenSuccessAction = {
      payload: {
        exp: undefined,
        refresh_token: 'test-refresh-token',
        token: 'this-is-a-test-token'
      },
      type: '@auth/REFRESH_TOKEN_SUCCESS'
    }

    jest.spyOn(api, 'EEMConnectPost').mockResolvedValue(mockedOkApiResponse)
    const spyDispatch = jest.spyOn(store, 'dispatch')

    refreshToken()

    await waitFor(() => {
      expect(spyDispatch).toHaveBeenNthCalledWith(1, refreshTokenAction)
      expect(spyDispatch).toHaveBeenNthCalledWith(2, refreshTokenSuccessAction)
    })
  })

  it('should dispatch failure action when api returns ok false', async () => {
    const refreshTokenAction = {
      payload: false,
      type: '@global/ENABLE_REFRESH_TOKEN'
    }
    const refreshTokenFailureAction = { type: '@auth/SIGN_OUT' }
    const spyDispatch = jest.spyOn(store, 'dispatch')

    jest.spyOn(api, 'EEMConnectPost').mockResolvedValue(mockedErrorApiResponse)
    const spyPush = jest.spyOn(history, 'push')

    const spySetHeaders = jest.spyOn(hubApi, 'setHeaders')

    refreshToken()

    await waitFor(() => {
      expect(spyDispatch).toHaveBeenNthCalledWith(1, refreshTokenAction)
      expect(spyDispatch).toHaveBeenNthCalledWith(2, refreshTokenFailureAction)
      expect(spyPush).toHaveBeenCalledWith('/login')
      expect(spySetHeaders).toHaveBeenCalledWith({
        Authorization: 'Bearer '
      })
    })
  })
})
