import mixpanel from 'mixpanel-browser'

export interface EventData {
  card_name: string
  location: 'dashboard' | 'header'
}

export const toolOpened = (data: EventData): void => {
  const clickEvent = 'Tool Opened'

  try {
    mixpanel.track(clickEvent, { ...data })
  } catch (error) {
    console.error('Erro ao capturar abertura de card mixpanel')
  }
}
