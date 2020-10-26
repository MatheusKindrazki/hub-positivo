import React from 'react';

import {
  RouteProps as ReactRouteProps,
  Route as ReactRoute,
  Redirect,
} from 'react-router-dom';

import Auth from '~/layouts/Auth';
import Logged from '~/layouts/Logged';
import { store } from '~/store';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = store.getState().auth;

  const RenderLayout = signed ? Logged : Auth;

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!signed ? (
          <RenderLayout>
            <Component />
          </RenderLayout>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
