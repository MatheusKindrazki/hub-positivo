import mixpanel from 'mixpanel-browser'

import mixPanelInit from '~/services/mixpanel/init'

jest.mock('mixpanel-browser')

process.env.REACT_APP_MIXPANEL_KEY = 'mix-panel-mock-key'

describe('Mixpanel Services', () => {
  it('Should properly boot MixPanel', () => {
    const mockMixPanel = jest.spyOn(mixpanel, 'init')

    mixPanelInit()

    expect(mockMixPanel).toBeCalledWith('mix-panel-mock-key', {
      batch_requests: true,
      cookie_domain: 'localhost'
    })
  })

  it('Show an error in the console if MixPanel is not instantiated', () => {
    const mockLog = jest.fn()

    Object.assign(console, {
      error: mockLog
    })

    jest.spyOn(mixpanel, 'init').mockImplementation(() => {
      throw new Error('Erro')
    })

    mixPanelInit()

    expect(mockLog).toBeCalledWith('Erro ao inicializar mix panel')
  })
})
