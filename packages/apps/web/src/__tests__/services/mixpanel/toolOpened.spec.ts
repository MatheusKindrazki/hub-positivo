import mixpanel from 'mixpanel-browser'

import { toolOpened, EventData } from '~/services/mixpanel/toolOpened'

const mockedEventProperties: EventData = {
  card_name: 'teste',
  location: 'dashboard'
}

jest.mock('mixpanel-browser', () => ({
  track: jest.fn()
}))

describe('testing if `mixpanel tool opened` function work properly', () => {
  const instance = mixpanel
  const { track } = instance

  it('mixpanelToolOpened send event with correct properties', () => {
    toolOpened(mockedEventProperties)
    expect(track).toHaveBeenCalledWith('Tool Opened', mockedEventProperties)
  })

  it('Show an error in the console if MixPanel is not instantiated', () => {
    const mockLog = jest.fn()

    Object.assign(console, {
      error: mockLog
    })

    jest.spyOn(mixpanel, 'track').mockImplementation(() => {
      throw new Error('Erro')
    })

    toolOpened(mockedEventProperties)

    expect(mockLog).toBeCalledWith('Erro ao capturar abertura de card mixpanel')
  })
})
