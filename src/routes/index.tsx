import React from 'react';

import { Switch, HashRouter } from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import Profile from '~/pages/Auth/Profile';
import SignIn from '~/pages/Auth/SignIn';
import Home from '~/pages/Home';
import history from '~/services/history';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <HashRouter hashType="slash" basename="/">
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/profile" component={Profile} />

          <Route path="/" component={Home} isPrivate />
        </Switch>
      </HashRouter>
    </ConnectedRouter>
  );
};

export default Routes;
