import React from 'react'

import ReactDOM from 'react-dom'
import mixpanel from 'mixpanel-browser'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'
import setGSCOnSubmit from './services/getSiteControl/gscOnSubmit'
import App from './App'

window.gsc = undefined

window.mixpanel = mixpanel

mixPanelInit()
setGSCOnSubmit()
hotjarInit()

window.newrelic?.addRelease('@hub', process.env.REACT_APP_VERSION as string)

ReactDOM.render(<App />, document.getElementById('hub-psd'))
