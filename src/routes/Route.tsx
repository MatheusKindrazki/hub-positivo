import React from 'react';

import {
  Route as ReactRoute,
  Redirect,
  RouteProps as ReactRouteProps,
} from 'wouter';

import Auth from '~/layouts/Auth';
import Logged from '~/layouts/Logged';
import { store } from '~/store';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = store.getState().auth;

  const RenderLayout = signed ? Logged : Auth;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  return (
    <RenderLayout>
      <ReactRoute {...rest} component={Component} />
    </RenderLayout>
  );
};

export default Route;
