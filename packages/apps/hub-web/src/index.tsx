import React from 'react'

import ReactDOM from 'react-dom'
import mixpanel from 'mixpanel-browser'

import getSiteControlInit from '@psdhub/gsc'

import history from '~/services/history'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'
import setGSCOnSubmit from './services/getSiteControl/gscOnSubmit'
import App from './App'

window.mixpanel = mixpanel

hotjarInit()
mixPanelInit()
setGSCOnSubmit()
getSiteControlInit(history)

window.newrelic?.addRelease('@hub', process.env.REACT_APP_VERSION as string)

ReactDOM.render(<App />, document.getElementById('hub-psd'))
