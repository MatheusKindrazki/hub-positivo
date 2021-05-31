import mixpanel from 'mixpanel-browser'

import mixPanelIdentifyUser from '~/services/mixpanel/identifyUser'

jest.mock('mixpanel-browser')

describe('Mixpanel Services', () => {
  it('Should shoot the MixPanel reset function', () => {
    const mockMixPanel = jest.spyOn(mixpanel, 'identify')

    mixPanelIdentifyUser({ guid: 'user-id' })

    expect(mockMixPanel).toBeCalledWith('user-id')
  })

  it('Show an error in the console if MixPanel is not instantiated', () => {
    const mockLog = jest.fn()

    Object.assign(console, {
      error: mockLog
    })

    jest.spyOn(mixpanel, 'identify').mockImplementation(() => {
      throw new Error('Erro')
    })

    mixPanelIdentifyUser({ guid: {} as string })

    expect(mockLog).toBeCalledWith('Erro ao identificar o usuário')
  })
})
