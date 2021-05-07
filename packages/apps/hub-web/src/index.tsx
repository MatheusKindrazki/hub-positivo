import React from 'react'

import ReactDOM from 'react-dom'

import getSiteControlInit from '@hub/gsc'

import history from '~/services/history'

import mixPanelInit from './services/mixpanel/init'
import hotjarInit from './services/hotjar/hotjarInit'

import '~/services/getSiteControl/trackWidgetSubmit'

import App from './App'

mixPanelInit()
hotjarInit()
getSiteControlInit(history)

window.newrelic?.addRelease('@hub', process.env.REACT_APP_VERSION as string)

ReactDOM.render(<App />, document.getElementById('hub-psd'))
