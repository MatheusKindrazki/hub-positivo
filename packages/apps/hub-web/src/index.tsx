/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import ReactDOM from 'react-dom'

import App from './App'

// do luiz => GTM-PCPNTVS
// temporário => GTM-NSCS85L
if (process.env.REACT_APP_NODE_ENV === 'production') {
  console.error = function () {} //eslint-disable-line
  console.warn = function () {} //eslint-disable-line

  Sentry.init({
    dsn:
      'https://47feebc700d446a7a58574fbe0acbec2@o490568.ingest.sentry.io/5554689',
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0
  })
}

declare global {
  interface Window {
    __HUB_USER_INFO__: {
      role: string
      name: string
      school: string
      grade_level: string
    }
  }
}

ReactDOM.render(<App />, document.getElementById('hub-psd'))
