import React from 'react'

import ReactDOM from 'react-dom'
import { Integrations } from '@sentry/tracing'
import * as Sentry from '@sentry/react'

import hotjarInit from './services/hotjar/hotjarInit'
import { amplitudeInit } from './services/amplitude'
import App from './App'

amplitudeInit()
hotjarInit()

if (process.env.REACT_APP_NODE_ENV === 'production') {
  console.error = function () {} //eslint-disable-line
  console.warn = function () {} //eslint-disable-line

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY,
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0
  })
}

ReactDOM.render(<App />, document.getElementById('hub-psd'))
