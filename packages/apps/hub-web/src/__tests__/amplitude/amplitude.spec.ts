import amplitude from 'amplitude-js'
import { renderHook } from '@testing-library/react-hooks'

import { store } from '~/store'

import { amplitudeToolOpened } from '~/services/amplitude/amplitudeToolOpened'
import { amplitudeInit } from '~/services/amplitude/amplitudeInit'

import { useAmplitudePageView } from '~/hooks/amplitude/useAmplitudePageView'

import { useAmplitudeSetProperties } from '../../hooks/amplitude/useAmplitudeSetProperties'

const mockState = {
  profile: {
    name: 'Fake name'
  },
  user: {
    school: {
      user_id: 'Fake id',
      value: 'Fake Value'
    },
    user: 'Fake user'
  },
  educationalStage: {
    level: 'Fake level'
  }
}

const mockParamsSetProperties = {
  educational_stage: mockState.educationalStage.level,
  role: mockState.profile.name,
  school: mockState.user.school.value,
  user: mockState.user.user
}

const mockedEventProperties = {
  category: 'teste',
  tool: 'teste',
  educational_stage: 'teste',
  user_role: 'teste',
  user_school: 'teste'
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

  it('Amplitude should initialize on amplitudeInit', () => {
    amplitudeInit()
    expect(init).toHaveBeenCalledTimes(1)
  })

  it('amplitudeToolOpened send event with correct properties', () => {
    amplitudeToolOpened(mockedEventProperties)
    expect(logEvent).toHaveBeenCalledWith('Tool Opened', mockedEventProperties)
  })

  it('useAmplitudeSetProperties must call setUserProperties and setUserId', () => {
    renderHook(() => useAmplitudeSetProperties())
    expect(store.getState).toHaveBeenCalledTimes(3)
    expect(setUserProperties).toHaveBeenCalledWith(mockParamsSetProperties)
    expect(setUserId).toHaveBeenCalledWith(mockState.user.school.user_id)
  })

  it('useAmplitudePageView should log event', () => {
    renderHook(() => useAmplitudePageView())
    expect(logEvent).toHaveBeenCalled()
    expect(store.getState).toHaveBeenCalledTimes(3)
  })
})
