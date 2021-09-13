import { renderHook } from '@testing-library/react-hooks'

import useRefreshToken from '~/pages/Solutions/pages/Microfrontend/hooks/useRefreshToken'
import * as communicator from '~/pages/Solutions/pages/Microfrontend/communicator'

import * as refreshToken from '~/middlewares/refreshToken'

jest.mock('~/pages/Solutions/pages/Microfrontend/communicator', () => ({
  __esModule: true,
  default: jest.fn(),
  clearData: jest.fn()
}))

jest.mock('~/middlewares/refreshToken', () => ({
  __esModule: true,
  default: jest.fn(() => 'token')
}))

jest.mock('@psdhub/common/layout/styles', () => ({
  useTheme: jest.fn(() => ({
    colors: {}
  }))
}))

describe('useRefreshToken should work properly', () => {
  const HUB_REFRESH_KEY = '@hub-refresh-token'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should call refresh function when HUB_REFRESH_KEY event is dispatched', async () => {
    renderHook(() => useRefreshToken())

    const spyRefreshToken = jest.spyOn(refreshToken, 'default')
    const spyCommunicator = jest.spyOn(communicator, 'default')
    await document.dispatchEvent(new CustomEvent(HUB_REFRESH_KEY))

    expect(spyRefreshToken).toHaveBeenCalled()
    expect(spyCommunicator).toHaveBeenCalled()
  })

  it('Should not call communicator when refreshToken does not return a token', async () => {
    const spyRefreshToken = jest
      .spyOn(refreshToken, 'default')
      .mockResolvedValue(false)
    renderHook(() => useRefreshToken())

    const spyCommunicator = jest.spyOn(communicator, 'default')
    await document.dispatchEvent(new CustomEvent(HUB_REFRESH_KEY))

    expect(spyRefreshToken).toHaveBeenCalled()
    expect(spyCommunicator).not.toHaveBeenCalled()
  })
})
