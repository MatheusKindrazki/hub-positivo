import React from 'react';

import { Switch } from 'react-router-dom';

import Home from '~/pages/Home';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/dashboard" component={Home} isPrivate />
    </Switch>
  );
};

export default Routes;
