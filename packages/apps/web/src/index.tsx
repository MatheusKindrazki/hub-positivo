import React from 'react'

import ReactDOM from 'react-dom'
import mixpanel from 'mixpanel-browser'

import { instance as instanceNR } from '@psdhub/newrelic'
import getSiteControlInit from '@psdhub/gsc'

import history from '~/services/history'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'
import { clearAllStorage } from './services/clearAllStorage'
import App from './App'

import '~/services/getSiteControl/trackWidgetSubmit'

window.mixpanel = mixpanel

instanceNR()
mixPanelInit()
hotjarInit()
getSiteControlInit(history)

clearAllStorage()

ReactDOM.render(<App />, document.getElementById('hub-psd'))
