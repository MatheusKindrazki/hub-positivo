import mixpanel from 'mixpanel-browser'

import mixPanelInit from '~/services/mixpanel/init'

jest.mock('mixpanel-browser')

process.env.REACT_APP_MIXPANEL_KEY = 'mix-panel-mock-key'

describe('Mixpanel Services', () => {
  it('Should properly boot MixPanel', () => {
    const mockMixPanel = jest.spyOn(mixpanel, 'init')

    mixPanelInit()

    expect(mockMixPanel).toBeCalledWith('mix-panel-mock-key', {
      track_pageview: true
    })
  })
})
