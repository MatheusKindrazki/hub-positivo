import React from 'react';

import { Switch } from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import Profile from '~/pages/Auth/Profile';
import SignIn from '~/pages/Auth/SignIn';
import Home from '~/pages/Home';
import IFrame from '~/pages/IFrame';
import history from '~/services/history';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/profile" component={Profile} />

        <Route path="/" exact component={Home} isPrivate />
        <Route path="/hub-frame" exact component={IFrame} isPrivate />
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;
