import React from 'react';

import { Switch } from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import Profile from '~/pages/Auth/Profile';
import SignIn from '~/pages/Auth/SignIn';
import Home from '~/pages/Home';
import history from '~/services/history';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/profile" component={Profile} />
          <Route path="/dashboard" component={Home} isPrivate />
        </Switch>
      </div>
    </ConnectedRouter>
  );
};

export default Routes;
