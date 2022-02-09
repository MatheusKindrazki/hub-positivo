import { isTokenExpired } from '~/utils/isTokenExpired'

describe('Check Auth Token Expiration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('Should return true if token expiration is minor or equals zero', () => {
    jest.useFakeTimers('modern')

    expect(isTokenExpired(0)).toBe(true)
    expect(isTokenExpired(-10)).toBe(true)
  })

  it('Should return false if token expiration is minor or equals than actual time', () => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2020, 3, 1))

    expect(isTokenExpired(new Date(2020, 3, 1).getTime() / 1000)).toBe(true)
    expect(isTokenExpired(new Date(2020, 3, 1).getTime() / 1000 - 1)).toBe(true)
  })

  it('Should return false if token expiration is greater than actual time', () => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2020, 3, 1))

    expect(isTokenExpired(new Date(2020, 3, 1).getTime() + 1 / 1000)).toBe(
      false
    )
  })
})
