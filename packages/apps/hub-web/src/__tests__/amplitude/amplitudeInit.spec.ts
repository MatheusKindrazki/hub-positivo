import amplitude from 'amplitude-js'

import { amplitudeInit } from '~/services/amplitude'

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    init: jest.fn()
  })
}))

describe('testing if `amplitude init` function work properly', () => {
  const instance = amplitude.getInstance()
  const { init } = instance
  it('Amplitude should initialize on amplitudeInit', () => {
    amplitudeInit()
    expect(init).toHaveBeenCalledTimes(1)
  })
})
