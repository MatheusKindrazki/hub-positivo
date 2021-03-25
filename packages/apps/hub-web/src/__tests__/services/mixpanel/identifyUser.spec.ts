import mixpanel from 'mixpanel-browser'

import mixPanelIdentifyUser from '~/services/mixpanel/identifyUser'

jest.mock('mixpanel-browser')

describe('Mixpanel Services', () => {
  it('Should shoot the MixPanel reset function', () => {
    const mockMixPanel = jest.spyOn(mixpanel, 'identify')

    mixPanelIdentifyUser({ guid: 'user-id' })

    expect(mockMixPanel).toBeCalledWith('user-id')
  })
})
