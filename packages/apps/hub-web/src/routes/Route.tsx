import React from 'react'

import {
  Route as ReactRoute,
  RouteProps as RoutePropsWouter,
  Redirect,
  useLocation
} from 'react-router-dom'

import Auth from '~/layouts/Auth'
import Iframe from '~/layouts/Iframe'
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
  const { pathname } = useLocation()

  const { signed } = store.getState().auth

  let RenderLayout = signed ? Logged : Auth

  if (pathname.includes('solucao')) {
    RenderLayout = Iframe
  }

  if (!signed && isPrivate) {
    if (pathname.includes('solucao')) {
      return <Redirect to={`/login?redirect=${pathname}`} />
    }
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
