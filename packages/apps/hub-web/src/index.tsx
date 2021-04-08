import React from 'react'

import ReactDOM from 'react-dom'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'
import setGSCOnSubmit from './services/getSiteControl/gscOnSubmit'
import { amplitudeInit } from './services/amplitude'
import App from './App'

const enableTracking = ['homolog', 'production']

setGSCOnSubmit()
mixPanelInit()

if (enableTracking.includes(process.env.REACT_APP_NODE_ENV as string)) {
  console.error = function () {} //eslint-disable-line
  console.warn = function () {} //eslint-disable-line

  amplitudeInit()
  hotjarInit()
}

ReactDOM.render(<App />, document.getElementById('hub-psd'))
