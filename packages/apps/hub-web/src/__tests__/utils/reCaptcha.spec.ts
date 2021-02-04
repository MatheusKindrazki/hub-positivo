import lscache from 'lscache'

import api from '@hub/api'

import {
  clearStrikes,
  checkForStrikes,
  storeStrike,
  handleCaptcha
} from '~/utils/reCaptcha'

jest.mock('lscache', () => ({
  get: jest.fn(),
  remove: jest.fn(),
  set: jest.fn()
}))

jest.mock('@hub/api')

describe('Captcha for Login', () => {
  it('Should trigger the lib that removes the captcha cache', () => {
    const spyRemove = jest.spyOn(lscache, 'remove')

    clearStrikes()

    expect(spyRemove).toBeCalledWith('loginStrikes')
  })

  it('Must validate quantity of stored items and return a Bool', () => {
    const spyGet = jest.spyOn(lscache, 'get')

    spyGet.mockReturnValue(['1', '2', '3'])

    const captchaTrue = checkForStrikes()

    expect(spyGet).toBeCalled()
    expect(captchaTrue).toBe(true)

    spyGet.mockReturnValue(['1'])

    const captchaFalse = checkForStrikes()

    expect(spyGet).toBeCalled()
    expect(captchaFalse).toBe(false)
  })

  it('Save to set login attempts in cache', () => {
    const getCache = jest.spyOn(lscache, 'get').mockReturnValue(['1', '2'])

    let setCache = jest.spyOn(lscache, 'set')

    storeStrike()

    // If you have data already entered
    expect(setCache).toBeCalled()

    getCache.mockReturnValue([])

    setCache = jest.spyOn(lscache, 'set')

    storeStrike()

    // If you do not have data already entered
    expect(setCache).toBeCalled()
  })

  it('You must validate the captcha token and remove the cache if ok', async () => {
    api.get = jest.fn().mockReturnValue({
      data: true
    })

    const mockTrueReturn = await handleCaptcha('valid-token')

    // Expected return from api
    expect(mockTrueReturn).toEqual(true)

    api.get = jest.fn().mockReturnValue({})

    const mockFalseReturn = await handleCaptcha('invalid-token')

    // Api not returning infos
    expect(mockFalseReturn).toEqual(false)
  })
})
