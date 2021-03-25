import mixpanel from 'mixpanel-browser'

export default function init(): void {
  const key = process.env.REACT_APP_MIXPANEL_KEY as string

  try {
    mixpanel.init(key, {
      track_pageview: true
    })
  } catch (error) {
    console.error('Erro ao inicializar mix panel')
  }
}
