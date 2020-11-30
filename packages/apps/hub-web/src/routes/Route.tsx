import React from 'react'

import {
  Route as ReactRoute,
  RouteProps as RoutePropsWouter,
  Redirect
} from 'react-router'

import Auth from '~/layouts/Auth'
import Logged from '~/layouts/Logged'
import { store } from '~/store'
interface RouteProps extends RoutePropsWouter {
  isPrivate?: boolean
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component,
  ...rest
}) => {
  const { signed } = store.getState().auth

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
