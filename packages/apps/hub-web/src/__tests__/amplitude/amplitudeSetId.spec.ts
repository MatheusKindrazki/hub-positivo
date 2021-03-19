import amplitude from 'amplitude-js'

import {
  amplitudeToolOpened,
  EventData
} from '~/services/amplitude/amplitudeToolOpened'

const mockedEventProperties: EventData = {
  card_name: 'teste',
  location: 'dashboard'
}

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    logEvent: jest.fn()
  })
}))

describe('testing if amplitude tool opened function work properly', () => {
  const instance = amplitude.getInstance()
  const { logEvent } = instance

  it('amplitudeToolOpened send event with correct properties', () => {
    amplitudeToolOpened(mockedEventProperties)
    expect(logEvent).toHaveBeenCalledWith('Tool Opened', mockedEventProperties)
  })
})
