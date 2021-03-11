import amplitude from 'amplitude-js'

interface eventData {
  card_name: string
  location: 'dashboard' | 'header'
}

export const amplitudeToolOpened = (data: eventData): void => {
  console.log(data)
  const clickEvent = 'Tool Opened'

  amplitude.getInstance().logEvent(clickEvent, { ...data })
}
