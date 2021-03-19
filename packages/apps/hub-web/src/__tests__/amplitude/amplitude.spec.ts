import amplitude from 'amplitude-js'

import {
  amplitudeToolOpened,
  EventData
} from '~/services/amplitude/amplitudeToolOpened'
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

const mockedEventProperties: EventData = {
  card_name: 'teste',
  location: 'dashboard'
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
  const { init, logEvent } = instance

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Amplitude should initialize on amplitudeInit', () => {
    amplitudeInit()
    expect(init).toHaveBeenCalledTimes(1)
  })

  it('amplitudeToolOpened send event with correct properties', () => {
    amplitudeToolOpened(mockedEventProperties)
    expect(logEvent).toHaveBeenCalledWith('Tool Opened', mockedEventProperties)
  })
})
