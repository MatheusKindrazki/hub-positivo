import amplitude from 'amplitude-js'

import clearAll from '~/hooks/amplitude/clearAll'

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    setUserId: jest.fn(),
    clearUserProperties: jest.fn(),
    regenerateDeviceId: jest.fn(),
    isNewSession: jest.fn()
  })
}))

describe('testing if `amplitude clear all` function work properly', () => {
  const instance = amplitude.getInstance()
  const {
    setUserId,
    clearUserProperties,
    regenerateDeviceId,
    isNewSession
  } = instance

  it('clearAll should clear all properties of amplitude`s session', () => {
    clearAll()

    expect(setUserId).toHaveBeenCalledTimes(1)
    expect(setUserId).toHaveBeenCalledWith(null)
    expect(clearUserProperties).toHaveBeenCalledTimes(1)
    expect(regenerateDeviceId).toHaveBeenCalledTimes(1)
    expect(isNewSession).toHaveBeenCalledTimes(1)
  })
})
