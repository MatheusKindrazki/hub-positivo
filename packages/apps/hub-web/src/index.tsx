import React from 'react'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import ReactDOM from 'react-dom'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'

if (process.env.NODE_ENV !== 'development') {
  console.error = function () {}; //eslint-disable-line
  console.warn = function () {}; //eslint-disable-line

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
    ga: any
  }
}

ReactDOM.render(<App />, document.getElementById('hub-psd'))
