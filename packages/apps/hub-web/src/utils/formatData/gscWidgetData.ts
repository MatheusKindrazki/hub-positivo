interface LooseBoolObject {
  [key: string]: boolean
}

export interface WidgetData {
  [key: string]: LooseBoolObject | string | boolean
}

export const formatWidgetData = (widgetId: number, data: WidgetData): any => {
  const formattedData: any = {}
  const validKeys = ['string', 'boolean']

  formattedData.widgetId = widgetId

  Object.keys(data)?.map(key => {
    const getTypeOf = typeof data[key]

    if (validKeys.includes(getTypeOf)) {
      formattedData[key] = data[key]
    } else {
      const optionName = Object.keys(data[key])?.map(fieldName => fieldName)
      formattedData[key] = optionName
    }
  })
  return formattedData
}
