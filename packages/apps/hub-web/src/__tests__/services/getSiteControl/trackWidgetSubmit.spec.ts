import mixpanel from 'mixpanel-browser'

import trackWidgetSubmit from '~/services/getSiteControl/trackWidgetSubmit'

const mockedWidgetId = 123456
const mockedWidgetData = {
  radio: { option1: true },
  checkboxes: { option1: true, option2: true },
  rating: { 5: true }
}
const formattedWidgetData = {
  checkboxes: ['option1', 'option2'],
  radio: ['option1'],
  rating: ['5'],
  widgetId: 123456
}

describe('trackWidgetSubmit should work properly', () => {
  afterEach(jest.clearAllMocks)

  const mixpanelSpy = jest
    .spyOn(mixpanel, 'track')
    .mockImplementation(jest.fn())

  it('should set onsubmit function', () => {
    const eventName = 'Widget submitted'
    trackWidgetSubmit(mockedWidgetId, mockedWidgetData)
    expect(mixpanelSpy).toHaveBeenCalledWith(eventName, formattedWidgetData)
  })

  it('should do nothing if window.gsc is undefined', () => {
    // alterando implementacao do mock do mixpanel para que lance um erro
    const errorSpy = jest.spyOn(console, 'error')
    mixpanelSpy.mockImplementation(() => {
      throw new Error()
    })

    trackWidgetSubmit(mockedWidgetId, mockedWidgetData)
    expect(errorSpy).toHaveBeenCalledWith(
      'Erro ao capturar submissao do widget do gsc no mixpanel'
    )
  })
})
