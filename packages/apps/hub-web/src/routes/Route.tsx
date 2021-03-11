import React from 'react'

import {
  Route as ReactRoute,
  RouteProps as RoutePropsWouter,
  Redirect,
  useLocation
} from 'react-router-dom'
import * as Sentry from '@sentry/react'

import { store } from '~/store'

import searchQuery from '~/hooks/useQuery'
// import { useAmplitudePageView } from '~/hooks/amplitude/useAmplitudePageView'

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
  // useAmplitudePageView()
  const { pathname } = useLocation()

  Sentry.configureScope(scope => scope.setTransactionName(pathname))

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
