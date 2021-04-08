import mixpanel from 'mixpanel-browser'
// utilizar formatacao dos dados quando a funcao estiver pronta
// import formatWidgetData from '~/utils/formatData/gscWidgetData'

const widgetSubmitEvent = 'Widget submitted'

const setGSCOnSubmit = () => {
  if (window.gsc) {
    window.gsc('onSubmit', (widgetId, data) => {
      try {
        mixpanel.track(widgetSubmitEvent, { widgetId, ...data })
      } catch (error) {
        console.error('Erro ao capturar submissao do widget do gsc no mixpanel')
      }
    })
  }
}

export default setGSCOnSubmit
