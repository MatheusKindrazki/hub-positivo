import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'

console.error = function () {}; //eslint-disable-line
console.warn = function () {}; //eslint-disable-line

declare global {
  interface Window {
    __HUB_GUID__: string
  }
}

ReactDOM.render(<App />, document.getElementById('hub-inject'))
