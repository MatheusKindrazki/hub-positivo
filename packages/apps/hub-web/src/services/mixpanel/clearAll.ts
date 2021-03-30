import mixpanel from 'mixpanel-browser'

export default (): void => {
  try {
    mixpanel.reset()
  } catch (error) {
    console.error('Erro ao resetar infos no mixpanel')
  }
}
