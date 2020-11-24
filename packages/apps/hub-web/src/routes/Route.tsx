import React from 'react'

import {
  Route as ReactRoute,
  RouteProps as RoutePropsWouter,
  Redirect
} from 'wouter'

interface RouteProps extends RoutePropsWouter {
  isPrivate?: boolean
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component,
  ...rest
}) => {
  const signed = false

  if (!signed && isPrivate) {
    return <Redirect to="/login" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />
  }

  return <ReactRoute component={component} {...rest} />
}

export default Route
