import mixpanel from 'mixpanel-browser'

export default (): void => {
  console.log('resetando as informações do MIXPANEL')

  try {
    mixpanel.reset()
  } catch (error) {
    console.error('Erro ao resetar infos no mixpanel')
  }
}
