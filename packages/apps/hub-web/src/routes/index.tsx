import React, { useContext, useEffect, Suspense } from 'react'

import { Switch, HashRouter, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import { useSelector } from 'react-redux'

import { VariantsProps } from '@psdhub/common/layout/styles/colors'
import ThemeContext from '@psdhub/common/layout/Provider/context'

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
const AccessControl = React.lazy(() => import('~/pages/AccessControl'))

const Solutions = React.lazy(() => import('~/pages/Solutions'))

const Routes: React.FC = () => {
  const { colorProfile } = useSelector((state: Store.State) => state.profile)
  const { guid } = useSelector((state: Store.State) => state.profile)

  const { mcf } = useSelector((state: Store.State) => state.authProduct)

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
              path="/controle-de-acessos"
              component={AccessControl}
              isPrivate
            />
            <Route
              path={['/solucao/:solution/:subpath+', '/solucao/:solution']}
              component={Iframe}
              isPrivate
            />

            <Route path="/" exact component={Home} isPrivate />

            <Route
              path={['/solucao/:solution/:subpath+', '/solucao/:solution']}
              component={mcf ? Solutions : Iframe}
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
