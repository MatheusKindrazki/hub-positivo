import mixpanel from 'mixpanel-browser'

// utilizar formatacao dos dados quando a funcao estiver pronta
import { formatWidgetData, WidgetData } from '~/utils/formatData/gscWidgetData'

const widgetSubmitEvent = 'Widget submitted'

const setGSCOnSubmit = (): void => {
  if (window.gsc) {
    window.gsc('onSubmit', (widgetId: number, data: WidgetData) => {
      try {
        mixpanel.track(widgetSubmitEvent, formatWidgetData(widgetId, data))
      } catch (error) {
        console.error('Erro ao capturar submissao do widget do gsc no mixpanel')
      }
    })
  }
}

export default setGSCOnSubmit
