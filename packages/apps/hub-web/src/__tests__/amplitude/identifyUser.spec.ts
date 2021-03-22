import amplitude from 'amplitude-js'

import setUserIdAmplitude from '~/hooks/amplitude/identifyUser'

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    setUserId: jest.fn()
  })
}))

describe('testing if amplitude Set Id function work properly', () => {
  const instance = amplitude.getInstance()
  const { setUserId } = instance

  it('amplitudeSetId should send event with correct id', () => {
    const id = 'userId'
    setUserIdAmplitude({ guid: id })

    expect(setUserId).toHaveBeenCalledWith(id)
  })
})
