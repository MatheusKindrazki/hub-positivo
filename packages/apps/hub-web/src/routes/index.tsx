import React from 'react'

import { ConnectedRouter } from 'connected-react-router'

import SignIn from '~/pages/Auth/SignIn'
import Home from '~/pages/Home'
import history from '~/services/history'

import Route from './Route'

const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Route path="/login" component={SignIn} />
      <Route path="/home" component={Home} />
      <Route path="/" component={Home} isPrivate />
    </ConnectedRouter>
  )
}

export default Routes
