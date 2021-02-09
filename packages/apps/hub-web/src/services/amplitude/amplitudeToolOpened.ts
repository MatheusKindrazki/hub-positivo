import amplitude from 'amplitude-js'

interface eventData {
  category: string
  tool: string
  educational_stage: string
  user_role: string
  user_school: string | undefined
}

export const amplitudeToolOpened = (data: eventData): void => {
  const clickEvent = 'Tool Opened'

  console.log(`data: ${Object.entries(data)}`)

  amplitude.getInstance().logEvent(clickEvent, { ...data })
}
