import React, { useContext, useEffect } from 'react'

import { useSelector } from 'react-redux'

import ThemeContext from '@hub/common/layout/Provider/context'
import { VariantsProps } from '@hub/common/layout/styles/colors'

import { ConnectedRouter } from 'connected-react-router'
import { Switch, HashRouter } from 'react-router-dom'

import history from '~/services/history'

import Route from './Route'
import withSuspense from './withSuspense'

// ? Importação das páginas
const Home = React.lazy(() => import('~/pages/Home'))
const Iframe = React.lazy(() => import('~/pages/Iframe'))
const SignIn = React.lazy(() => import('~/pages/Auth/SignIn'))
const Profile = React.lazy(() => import('~/pages/Auth/Profile'))
const ForgotFail = React.lazy(() => import('~/pages/Auth/ForgotFail'))
const ExpiredToken = React.lazy(() => import('~/pages/Auth/ExpiredToken'))
const ChangePassword = React.lazy(() => import('~/pages/Auth/ChangePassword'))
const ForgotPassword = React.lazy(() => import('~/pages/Auth/ForgotPassword'))

const Routes: React.FC = () => {
  const { colorProfile } = useSelector((state: Store.State) => state.profile)

  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    theme({ profile: (colorProfile || 'default') as VariantsProps })
  }, [colorProfile, theme])

  return (
    <ConnectedRouter history={history}>
      <HashRouter
        hashType="slash"
        basename={process.env.REACT_APP_PATHNAME_RESOLVE}
      >
        <Switch>
          <Route path="/login" component={withSuspense(SignIn)} />
          <Route path="/profile" component={withSuspense(Profile)} />
          <Route
            path="/forgot-password/failure"
            component={withSuspense(ForgotFail)}
          />
          <Route
            path="/forgot-password"
            exact
            component={withSuspense(ForgotPassword)}
          />
          <Route path="/expired-token" component={withSuspense(ExpiredToken)} />
          <Route
            path="/change-password"
            component={withSuspense(ChangePassword)}
          />
          <Route
            path={['/solucao/:solution/:subpath+', '/solucao/:solution']}
            component={withSuspense(Iframe)}
            isPrivate
          />

          <Route path="/" component={withSuspense(Home)} isPrivate />
        </Switch>
      </HashRouter>
    </ConnectedRouter>
  )
}

export default Routes
