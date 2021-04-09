import { format } from 'date-fns'

interface LooseObject {
  [key: string]: boolean | string[] | string
}

// interface WidgetData {
//   time: number | string
//   radio?: LooseObject
//   text?: string
//   textarea?: string
//   checkboxes?: LooseObject
//   select?: LooseObject
//   rating?: LooseObject
//   checkbox?: boolean
// }

interface WidgetData {
  [index: string]: any
}

interface FormattedWidgetData {
  [index: string]: any
}

const formatWidgetButtons = (data: LooseObject): string[] | string => {
  const key = Object.keys(data)
  if (key.length === 1) return key[0]

  return key
}

const formatWidgetData = (
  widgetId: number,
  data: WidgetData
): FormattedWidgetData => {
  const formattedObject = {} as FormattedWidgetData
  formattedObject.widgetId = widgetId

  // Para que os campos de botoes nao sejam objetos com booleanos, podemos filtrar os botoes deixando-os com o nome da chave somente
  const inputKeys = Object.keys(data)

  console.log(inputKeys)
  inputKeys.map(key => {
    // eslint-disable-next-line no-constant-condition
    if (key === 'radio' || 'checkboxes' || 'select' || 'rating') {
      formattedObject[key] = formatWidgetButtons(data[key])
    }
  })

  if (typeof data.time === 'number') {
    formattedObject.time = format(data.time, 'dd MM yyyy, H:mm:ss')
  }

  return formattedObject
}

export default formatWidgetData
