import React, { useContext, useEffect, Suspense } from 'react'

import { Switch, HashRouter, Redirect } from 'react-router-dom'
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
const MyClasses = React.lazy(() => import('~/pages/MyClasses'))
const ForgotFail = React.lazy(() => import('~/pages/Auth/ForgotFail'))
const ExpiredToken = React.lazy(() => import('~/pages/Auth/ExpiredToken'))
const ChangePassword = React.lazy(() => import('~/pages/Auth/ChangePassword'))
const ForgotPassword = React.lazy(() => import('~/pages/Auth/ForgotPassword'))

const Solutions = React.lazy(() => import('~/pages/Solutions'))

const Routes: React.FC = () => {
  const { colorProfile } = useSelector((state: Store.State) => state.profile)
  const { guid } = useSelector((state: Store.State) => state.profile)

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
            <Route path="/perfil" component={Profile} />
            <Route path="/esqueci-minha-senha/falhou" component={ForgotFail} />
            <Route
              path="/esqueci-minha-senha"
              exact
              component={ForgotPassword}
            />
            <Route path="/token-expirado" component={ExpiredToken} />
            <Route path="/alterar-senha" component={ChangePassword} />
            <Route
              path={['/solucao/:solution/:subpath+', '/solucao/:solution']}
              component={Iframe}
              isPrivate
            />

            <Route path="/" exact component={Home} isPrivate />
            <Route
              sensitive
              path="/teste/:subpath+"
              component={Solutions}
              isPrivate
            />
            {guid === 'PROFESSOR' && (
              <Route path="/minhas-turmas" component={MyClasses} isPrivate />
            )}

            <Redirect to="/" from="*" />
          </Switch>
        </HashRouter>
      </ConnectedRouter>
    </Suspense>
  )
}

export default Routes
