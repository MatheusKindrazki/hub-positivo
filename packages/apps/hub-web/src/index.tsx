import React from 'react'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import ReactDOM from 'react-dom'

import App from './App'

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
