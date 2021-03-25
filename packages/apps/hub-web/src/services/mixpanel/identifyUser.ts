import mixpanel from 'mixpanel-browser'

export default (data: { guid: string }): void => {
  mixpanel.identify(data.guid)
}
