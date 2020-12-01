/* eslint-disable prettier/prettier */
import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'

declare global {
  interface Window {
    __HUB_GUID__: string
  }
}

const url = window.location.pathname

if (url.split('-').length === 5) {
  const guid = url.split('/')

  window.__HUB_GUID__ = guid[guid.length - 1]
}

ReactDOM.render(<App />, document.getElementById('hub-inject'))
