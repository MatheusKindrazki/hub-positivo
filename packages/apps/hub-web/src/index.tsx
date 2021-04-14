import React from 'react'

import ReactDOM from 'react-dom'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'
import App from './App'

mixPanelInit()

hotjarInit()

window.newrelic?.addRelease('@hub', process.env.REACT_APP_VERSION as string)

ReactDOM.render(<App />, document.getElementById('hub-psd'))
