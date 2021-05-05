import mixpanel from 'mixpanel-browser'

export default (data: { guid: string }): void => {
  window.newrelic?.setCustomAttribute('user_guid', data.guid)

  window.newrelic?.addRelease('@hub', process.env.REACT_APP_VERSION as string)

  try {
    window.newrelic?.setCustomAttribute('user_guid', data.guid)

    mixpanel.identify(data.guid)
  } catch (e) {
    console.error('Erro ao identificar o usuário')
  }
}
