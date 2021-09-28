import React from 'react'

import ReactDOM from 'react-dom'
import mixpanel from 'mixpanel-browser'

import getSiteControlInit from '@psdhub/gsc'

import history from '~/services/history'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'
import { clearAllStorage } from './services/clearAllStorage'
import App from './App'

import '~/services/getSiteControl/trackWidgetSubmit'

window.mixpanel = mixpanel

mixPanelInit()
hotjarInit()
getSiteControlInit(history)

clearAllStorage()

ReactDOM.render(<App />, document.getElementById('hub-psd'))
