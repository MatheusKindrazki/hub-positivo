import React from 'react'

import { HubProvider } from '@hub/common/layout'

import { createBrowserHistory } from 'history'
import { Router, Switch, Route } from 'react-router'

import Header from './pages/Header'
import GlobalStyle from './styles/global'

export const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <HubProvider>
      <Router history={history}>
        <Switch>
          <Route path="/auth/:guid+" component={Header} />

          <Route path="*" component={Header} />
        </Switch>
      </Router>

      <GlobalStyle />
    </HubProvider>
  )
}

export default App
