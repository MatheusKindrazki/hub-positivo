import * as relic from 'new-relic-browser'

type NewProps = typeof relic

declare global {
  export interface Window {
    newrelic?: NewProps
  }
}

export default global
