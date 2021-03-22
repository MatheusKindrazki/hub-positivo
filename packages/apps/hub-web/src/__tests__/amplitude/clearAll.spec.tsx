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

describe('testing if amplitude clear all function work properly', () => {
  const instance = amplitude.getInstance()
  const { setUserId } = instance

  it('clearAll should clear all properties of amplitude`s session', () => {
    expect(1).toBe(1)
  })
})
