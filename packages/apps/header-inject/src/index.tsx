/* eslint-disable prettier/prettier */
import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'

declare global {
  interface Window {
    __HUB_GUID__: string
  }
}

ReactDOM.render(<App />, document.getElementById('hub-inject'))
