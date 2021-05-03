import React from 'react'

import {
  Route as ReactRoute,
  RouteProps as RoutePropsWouter,
  Redirect,
  useLocation
} from 'react-router-dom'

import { store } from '~/store'

import gscPageView from '~/services/getSiteControl/pageView'

import searchQuery from '~/hooks/useQuery'

const Auth = React.lazy(() => import('~/layouts/Auth'))
const Logged = React.lazy(() => import('~/layouts/Logged'))
const Solutions = React.lazy(() => import('~/layouts/Solutions'))
interface RouteProps extends RoutePropsWouter {
  isPrivate?: boolean
}
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component,
  ...rest
}) => {
  const { pathname } = useLocation()

  window.newrelic?.setCurrentRouteName(pathname)

  gscPageView(pathname)

  const { signed } = store.getState().auth

  let RenderLayout = signed ? Logged : Auth

  if (pathname.includes('solucao')) {
    RenderLayout = Solutions
  }

  if (!signed && isPrivate) {
    if (pathname.includes('solucao')) {
      return <Redirect to={`/login?redirect=${pathname}`} />
    }
    return <Redirect to="/login" />
  }

  if (signed && !isPrivate) {
    const search = searchQuery()
    const redirectTo = search.get('redirect') || undefined

    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return <Redirect to="/" />
  }

  return (
    <React.Suspense fallback={null}>
      <RenderLayout>
        <ReactRoute component={component} {...rest} />
      </RenderLayout>
    </React.Suspense>
  )
}

export default Route
