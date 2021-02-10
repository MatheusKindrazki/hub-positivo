import amplitude from 'amplitude-js'

import { amplitudeToolOpened } from '~/services/amplitude/amplitudeToolOpened'

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    logEvent: jest.fn()
  })
}))

const mockedEventProperties = {
  category: 'teste',
  tool: 'teste',
  educational_stage: 'teste',
  user_role: 'teste',
  user_school: 'teste'
}

const mockedEventName = 'Tool Opened'

describe('amplitudeToolOpened works without crashing', () => {
  it('should be called with correct properties', () => {
    const instance = amplitude.getInstance()
    const spyLogEvent = jest.spyOn(instance, 'logEvent')

    amplitudeToolOpened(mockedEventProperties)
    expect(spyLogEvent).toHaveBeenCalledWith(
      mockedEventName,
      mockedEventProperties
    )
  })
})
