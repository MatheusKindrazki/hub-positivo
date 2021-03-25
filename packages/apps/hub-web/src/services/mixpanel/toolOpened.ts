import mixpanel from 'mixpanel-browser'

export interface EventData {
  card_name: string
  location: 'dashboard' | 'header'
}

export const toolOpened = (data: EventData): void => {
  const clickEvent = 'Tool Opened'

  mixpanel.track(clickEvent, { ...data })
}
