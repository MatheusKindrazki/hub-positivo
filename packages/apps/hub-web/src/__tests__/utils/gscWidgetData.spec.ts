import { formatWidgetData, WidgetData } from '~/utils/formatData/gscWidgetData'

const mockedWidgetData: WidgetData = {
  radio: { option1: true, option2: true },
  checkboxes: { option1: true },
  rating: { 5: true },
  text: 'texto teste',
  textarea: 'texto longo, texto longo'
}

const mockedWidgetId = 123456

describe('formatWidgetData should work properly', () => {
  const mockedReturn = {
    checkboxes: ['option1'],
    radio: ['option1', 'option2'],
    rating: ['5'],
    text: 'texto teste',
    textarea: 'texto longo, texto longo',
    widgetId: 123456
  }
  it('should return formatted data', () => {
    const result = formatWidgetData(mockedWidgetId, mockedWidgetData)
    expect(result).toStrictEqual(mockedReturn)
  })
})
