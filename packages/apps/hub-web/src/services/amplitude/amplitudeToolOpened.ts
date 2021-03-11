import amplitude from 'amplitude-js'

export interface EventData {
  card_name: string
  location: 'dashboard' | 'header'
}

export const amplitudeToolOpened = (data: EventData): void => {
  const clickEvent = 'Tool Opened'

  amplitude.getInstance().logEvent(clickEvent, { ...data })
}
