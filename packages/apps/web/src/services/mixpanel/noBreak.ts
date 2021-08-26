import mixpanel from 'mixpanel-browser'

export interface EventData {
  user_login: string
  type:
    | 'No Break Activated'
    | 'No Break Closed'
    | 'No Break Meet Accessed'
    | 'No Break Studos Accessed'
}

export const noBreak = (data: EventData): void => {
  try {
    mixpanel.track(data.type, { user_login: data.user_login })
  } catch (error) {
    console.error('Erro ao enviar ao mixpanel', data.type)
  }
}
