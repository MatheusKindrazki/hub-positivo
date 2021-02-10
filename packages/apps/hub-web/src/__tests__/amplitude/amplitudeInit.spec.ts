import amplitude from 'amplitude-js'

import { amplitudeInit } from '~/services/amplitude/amplitudeInit'

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    init: jest.fn()
  })
}))

describe('amplitudeToolOpened works without crashing', () => {
  it('should be called with correct properties', () => {
    const instance = amplitude.getInstance()
    const spyInit = jest.spyOn(instance, 'init')

    amplitudeInit()
    expect(spyInit).toHaveBeenCalledTimes(1)
  })
})
