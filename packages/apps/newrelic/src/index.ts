import * as relic from 'new-relic-browser'

type NewProps = typeof relic & {
  setAttribute(name: string, value: string | number): void
}

declare global {
  export interface Window {
    newrelic?: NewProps
  }
}

export default global

export * from './services'
