import React, { useContext, useEffect, Suspense } from 'react'

import { Switch, HashRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import { useSelector } from 'react-redux'

import { VariantsProps } from '@hub/common/layout/styles/colors'
import ThemeContext from '@hub/common/layout/Provider/context'

import history from '~/services/history'

import Route from './Route'

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
    <Suspense fallback={null}>
      <ConnectedRouter history={history}>
        <HashRouter
          hashType="slash"
          basename={process.env.REACT_APP_PATHNAME_RESOLVE}
        >
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/profile" component={Profile} />
            <Route path="/forgot-password/failure" component={ForgotFail} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/expired-token" component={ExpiredToken} />
            <Route path="/change-password" component={ChangePassword} />
            <Route
              path={['/solucao/:solution/:subpath+', '/solucao/:solution']}
              component={Iframe}
              isPrivate
            />

            <Route path="/" component={Home} isPrivate />
          </Switch>
        </HashRouter>
      </ConnectedRouter>
    </Suspense>
  )
}

export default Routes
