import mixpanel from 'mixpanel-browser'

export default (data: { guid: string }): void => {
  try {
    mixpanel.identify(data.guid)
  } catch (e) {
    console.error('Erro ao identificar o usuário')
  }
}
