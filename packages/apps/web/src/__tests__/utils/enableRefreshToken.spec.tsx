import { store } from '~/store'

import { enableRefreshToken } from '~/utils/enableRefreshToken'

jest.mock('~/store', () => ({
  store: {
    getState: () => ({
      global: {
        enableMiddlewareRefreshToken: true
      }
    })
  }
}))

describe('enableRefreshToken util', () => {
  it('should return false when current date is smaller than expiration date', () => {
    const expirationDate = new Date(9999, 11, 17, 6, 20, 30).getTime()

    const result = enableRefreshToken(expirationDate / 1000)

    expect(result).toBeFalsy()
  })

  it('should return true when current date is greater than expiration date', () => {
    const expirationDate = new Date(2001, 11, 17, 6, 20, 30).getTime()

    const result = enableRefreshToken(expirationDate / 1000)

    expect(result).toBeTruthy()
  })

  it('should return true when current date is equal to expiration date', () => {
    jest.spyOn(new Date(), 'getTime').mockReturnValue(1000)

    const result = enableRefreshToken(new Date().getTime() / 1000)

    expect(result).toBeTruthy()
  })

  it('should return false when enableMiddlewareRefreshToken is false', () => {
    jest.spyOn(store, 'getState').mockReturnValue({
      global: {
        enableMiddlewareRefreshToken: false
      }
    } as any)

    const result = enableRefreshToken(new Date().getTime())

    expect(result).toBeFalsy()
  })
})
