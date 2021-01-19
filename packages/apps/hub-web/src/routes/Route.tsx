import React from 'react'

import {
  Route as ReactRoute,
  RouteProps as RoutePropsWouter,
  Redirect,
  useLocation
} from 'react-router-dom'

import useQuery from '~/hooks/useQuery'
import withSuspense from '~/routes/withSuspense'
import { store } from '~/store'

const Auth = React.lazy(() => import('~/layouts/Auth'))
const Iframe = React.lazy(() => import('~/layouts/Iframe'))
const Logged = React.lazy(() => import('~/layouts/Logged'))
interface RouteProps extends RoutePropsWouter {
  isPrivate?: boolean
}
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component,
  ...rest
}) => {
  const { pathname } = useLocation()

  const search = useQuery()
  const redirectTo = search.get('redirect') || undefined

  const { signed } = store.getState().auth

  let RenderLayout = signed ? withSuspense(Logged) : withSuspense(Auth)

  if (pathname.includes('solucao')) {
    RenderLayout = withSuspense(Iframe)
  }

  if (!signed && isPrivate) {
    if (pathname.includes('solucao')) {
      return <Redirect to={`/login?redirect=${pathname}`} />
    }
    return <Redirect to="/login" />
  }

  if (signed && !isPrivate) {
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return <Redirect to="/" />
  }

  return (
    <RenderLayout>
      <ReactRoute component={component} {...rest} />
    </RenderLayout>
  )
}

export default Route
