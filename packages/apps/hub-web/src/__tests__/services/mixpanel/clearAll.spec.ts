import mixpanel from 'mixpanel-browser'

import mixPanelClearAll from '~/services/mixpanel/clearAll'

jest.mock('mixpanel-browser')

describe('Mixpanel Services', () => {
  it('Should shoot the MixPanel reset function', () => {
    const mockMixPanel = jest.spyOn(mixpanel, 'reset')

    mixPanelClearAll()

    expect(mockMixPanel).toBeCalled()
  })

  it('Show an error in the console if MixPanel is not instantiated', () => {
    const mockLog = jest.fn()

    Object.assign(console, {
      error: mockLog
    })

    jest.spyOn(mixpanel, 'reset').mockImplementation(() => {
      throw new Error('Erro')
    })

    mixPanelClearAll()

    expect(mockLog).toBeCalledWith('Erro ao resetar infos no mixpanel')
  })
})
