import mixpanel from 'mixpanel-browser'

import { formatWidgetData, WidgetData } from '~/utils/formatData/gscWidgetData'

const widgetSubmitEvent = 'Widget Submitted'

const trackWidgetSubmit = (widgetId: number, data: WidgetData): void => {
  try {
    mixpanel.track(widgetSubmitEvent, formatWidgetData(widgetId, data))
  } catch (error) {
    console.error('Erro ao capturar submissao do widget do gsc no mixpanel')
  }
}

export default trackWidgetSubmit
