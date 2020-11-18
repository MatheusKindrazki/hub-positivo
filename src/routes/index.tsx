import React from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { Switch, Router } from 'wouter';

import Profile from '~/pages/Auth/Profile';
import SignIn from '~/pages/Auth/SignIn';
import Home from '~/pages/Home';
import history from '~/services/history';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Router base={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/profile" component={Profile} />

          <Route path="/" component={Home} isPrivate />
        </Switch>
      </Router>
    </ConnectedRouter>
  );
};

export default Routes;
