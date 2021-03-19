import amplitude from 'amplitude-js'

import { amplitudeInit } from '~/services/amplitude/amplitudeInit'

const mockState = {
  profile: {
    name: 'Fake name',
    profiles: [{ name: 'fakeRole' }, { name: 'fakeRole' }]
  },
  user: {
    school: {
      value: 'Fake Value'
    },
    user: {
      guid: 'fake Guid'
    }
  },
  educationalStage: {
    levels: [
      { label: 'Fake level', value: 'fake value' },
      { label: 'Fake level', value: 'fake value' }
    ]
  },
  auth: {
    signed: true
  }
}

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    init: jest.fn(),
    setUserProperties: jest.fn(),
    setUserId: jest.fn(),
    logEvent: jest.fn()
  })
}))

jest.mock('~/store', () => ({
  store: {
    getState: jest.fn().mockImplementation(() => mockState)
  }
}))

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({ pathname: '/' })
}))

describe('testing amplitude functions', () => {
  const instance = amplitude.getInstance()
  const { init } = instance

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Amplitude should initialize on amplitudeInit', () => {
    amplitudeInit()
    expect(init).toHaveBeenCalledTimes(1)
  })
})
