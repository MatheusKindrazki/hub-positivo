import React from 'react'

import ReactDOM from 'react-dom'
import mixpanel from 'mixpanel-browser'

import getSiteControlInit from '@psdhub/gsc'

import history from '~/services/history'
import trackWidgetSubmit from '~/services/getSiteControl/trackWidgetSubmit'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'
import App from './App'

window.mixpanel = mixpanel

hotjarInit()
mixPanelInit()
getSiteControlInit(history, trackWidgetSubmit)

window.newrelic?.addRelease('@hub', process.env.REACT_APP_VERSION as string)

ReactDOM.render(<App />, document.getElementById('hub-psd'))
