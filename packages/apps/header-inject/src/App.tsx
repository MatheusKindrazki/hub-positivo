import React from 'react'

import { HubProvider } from '@hub/common/layout'

import { createBrowserHistory } from 'history'
import { Router, Switch, Route } from 'react-router'

import Header from './components/Header'
import AuthProvider from './hooks/auth'
import GlobalStyle from './styles/global'

const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <HubProvider>
      <AuthProvider>
        <Router history={history}>
          <Switch>
            <Route path="*" component={Header} />
          </Switch>
        </Router>

        <GlobalStyle />
      </AuthProvider>
    </HubProvider>
  )
}

export default App
