import amplitude from 'amplitude-js'

export default (): void => {
  amplitude.getInstance().clearUserProperties()
  amplitude.getInstance().regenerateDeviceId()
  amplitude.getInstance().isNewSession()

  amplitude.getInstance().setUserId(null)
}
