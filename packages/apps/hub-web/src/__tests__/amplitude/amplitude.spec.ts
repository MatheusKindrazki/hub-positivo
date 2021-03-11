import amplitude from 'amplitude-js'
import { renderHook } from '@testing-library/react-hooks'

import { store } from '~/store'

import { amplitudeToolOpened } from '~/services/amplitude/amplitudeToolOpened'
import { amplitudeInit } from '~/services/amplitude/amplitudeInit'

import { useAmplitudePageView } from '~/hooks/amplitude/useAmplitudePageView'

import { useAmplitudeSetProperties } from '../../hooks/amplitude/useAmplitudeSetProperties'

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

const mockParamsSetProperties = {
  educational_stages: ['Fake level (fake value)', 'Fake level (fake value)'],
  roles: ['fakeRole', 'fakeRole'],
  selectedRole: mockState.profile.name,
  school: mockState.user.school,
  user: mockState.user.user
}

const mockedEventProperties = {
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
  const { init, logEvent, setUserId, setUserProperties } = instance

  afterEach(() => {
    jest.clearAllMocks()
  })

  it.skip('Amplitude should initialize on amplitudeInit', () => {
    amplitudeInit()
    expect(init).toHaveBeenCalledTimes(1)
  })

  it.skip('amplitudeToolOpened send event with correct properties', () => {
    // amplitudeToolOpened(mockedEventProperties)
    expect(logEvent).toHaveBeenCalledWith('Tool Opened', mockedEventProperties)
  })

  it.skip('useAmplitudeSetProperties must call setUserProperties and setUserId', () => {
    renderHook(() => useAmplitudeSetProperties())
    expect(store.getState).toHaveBeenCalledTimes(3)
    expect(setUserProperties).toHaveBeenCalledWith(mockParamsSetProperties)
    expect(setUserId).toHaveBeenCalledWith(mockState.user.user.guid)
  })

  it.skip('useAmplitudePageView should log event', () => {
    renderHook(() => useAmplitudePageView())
    expect(logEvent).toHaveBeenCalled()
    expect(store.getState).toHaveBeenCalledTimes(4)
  })

  it.skip('useAmplitudePageView shouldn`t log event when signed is false', () => {
    mockState.auth.signed = false
    renderHook(() => useAmplitudePageView())
    expect(logEvent).not.toHaveBeenCalled()
  })
})
