// import mixpanel from 'mixpanel-browser'

// import { formatWidgetData, WidgetData } from '~/utils/formatData/gscWidgetData'

// const widgetSubmitEvent = 'Widget Submitted'

// const trackWidgetSubmit = (widgetId: number, data: WidgetData): void => {
//   try {
//     mixpanel.track(widgetSubmitEvent, formatWidgetData(widgetId, data))
//   } catch (error) {
//     console.error('Erro ao capturar submissão do widget do gsc no mixpanel')
//   }
// }

const teste = ''

window.addEventListener('@psdhub:gsc:submit', e => {
  console.log('GSC BRASIL', e)
})

export default teste
