import React from 'react'

import { HubProvider } from '@hub/common/layout'

import { createBrowserHistory } from 'history'
import { Router, Switch, Route } from 'react-router'

import { AuthProvider } from './hooks/auth'
import Header from './pages/Header'
import GlobalStyle from './styles/global'

export const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <HubProvider>
      <AuthProvider>
        <Router history={history}>
          <Switch>
            <Route path="/auth/:guid+" component={Header} />

            <Route path="*" component={Header} />
          </Switch>
        </Router>
      </AuthProvider>

      <GlobalStyle />
    </HubProvider>
  )
}

export default App
