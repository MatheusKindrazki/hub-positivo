import React from 'react'

import ReactDOM from 'react-dom'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'
import { amplitudeInit } from './services/amplitude'
import App from './App'

const enableTracking = ['homolog', 'production']

mixPanelInit()

if (enableTracking.includes(process.env.REACT_APP_NODE_ENV as string)) {
  amplitudeInit()
  hotjarInit()
}

window.newrelic?.addRelease('@hub', process.env.REACT_APP_VERSION as string)

ReactDOM.render(<App />, document.getElementById('hub-psd'))
