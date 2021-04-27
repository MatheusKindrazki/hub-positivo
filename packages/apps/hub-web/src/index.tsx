import React from 'react'

import ReactDOM from 'react-dom'

import hotjarInit from './services/hotjar/hotjarInit'
import setGSCOnSubmit from './services/getSiteControl/gscOnSubmit'
import App from './App'

setGSCOnSubmit()
hotjarInit()

window.newrelic?.addRelease('@hub', process.env.REACT_APP_VERSION as string)

ReactDOM.render(<App />, document.getElementById('hub-psd'))
