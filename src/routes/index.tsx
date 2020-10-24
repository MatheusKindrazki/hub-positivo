import React from 'react';

import { Switch } from 'react-router-dom';

import Profile from '~/pages/Auth/Profile';
import SignIn from '~/pages/Auth/SignIn';
import Home from '~/pages/Home';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/profile" exact component={Profile} />

      <Route path="/dashboard" component={Home} isPrivate />
    </Switch>
  );
};

export default Routes;
