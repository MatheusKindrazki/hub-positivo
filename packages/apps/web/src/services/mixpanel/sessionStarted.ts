import mixpanel from 'mixpanel-browser'

const eventName = 'Session Started'

type eventProps = {
  tokenRefreshed: boolean
}

const sessionStarted = (eventData: eventProps): void => {
  try {
    mixpanel.track(eventName, eventData)
  } catch (error) {
    console.error('Erro ao capturar inicio de sessão no Mixpanel')
  }
}

export default sessionStarted
