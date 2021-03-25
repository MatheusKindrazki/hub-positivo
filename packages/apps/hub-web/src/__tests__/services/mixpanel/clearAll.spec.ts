import mixpanel from 'mixpanel-browser'

import mixPanelClearAll from '~/services/mixpanel/clearAll'

jest.mock('mixpanel-browser')

describe('Mixpanel Services', () => {
  it('Should shoot the MixPanel reset function', () => {
    const mockMixPanel = jest.spyOn(mixpanel, 'reset')

    mixPanelClearAll()

    expect(mockMixPanel).toBeCalled()
  })
})
