import amplitude from 'amplitude-js'

export default (data: { guid: string }): void => {
  amplitude.getInstance().setUserId(data.guid)
}
