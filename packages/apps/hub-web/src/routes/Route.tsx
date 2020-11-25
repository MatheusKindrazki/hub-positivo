import React from 'react'

import {
  Route as ReactRoute,
  RouteProps as RoutePropsWouter,
  Redirect
} from 'wouter'

import Auth from '~/layouts/Auth'
import Logged from '~/layouts/Logged'
interface RouteProps extends RoutePropsWouter {
  isPrivate?: boolean
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component,
  ...rest
}) => {
  const signed = false

  const RenderLayout = signed ? Logged : Auth

  if (!signed && isPrivate) {
    return <Redirect to="/login" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />
  }

  return (
    <RenderLayout>
      <ReactRoute component={component} {...rest} />
    </RenderLayout>
  )
}

export default Route
