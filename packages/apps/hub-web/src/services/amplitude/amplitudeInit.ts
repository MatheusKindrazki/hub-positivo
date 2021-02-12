import amplitude from 'amplitude-js'

const AMP_KEY = process.env.REACT_APP_AMPLITUDE_KEY as string

export const amplitudeInit = (): void => {
  amplitude.getInstance().init(AMP_KEY)
}
