import React from 'react'

import ReactDOM from 'react-dom'
import { Integrations } from '@sentry/tracing'
import * as Sentry from '@sentry/react'

import App from './App'

if (process.env.REACT_APP_NODE_ENV === 'production') {
  console.error = function () {} //eslint-disable-line
  console.warn = function () {} //eslint-disable-line

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY,
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 0.1,
    release: '@hub:' + process.env.REACT_APP_VERSION
  })
}

ReactDOM.render(<App />, document.getElementById('hub-psd'))
