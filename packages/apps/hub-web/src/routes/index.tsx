import React, { useContext, useEffect } from 'react'

import { useSelector } from 'react-redux'

import ThemeContext from '@hub/common/layout/Provider/context'
import { VariantsProps } from '@hub/common/layout/styles/colors'

import { ConnectedRouter } from 'connected-react-router'
import { Switch, HashRouter } from 'react-router-dom'

import ChangePassword from '~/pages/Auth/ChangePassword'
import ExpiredToken from '~/pages/Auth/ExpiredToken'
import ForgotPassword from '~/pages/Auth/ForgotPassword'
import ForgotPasswordFail from '~/pages/Auth/ForgotPasswordFail'
import Profile from '~/pages/Auth/Profile'
import SignIn from '~/pages/Auth/SignIn'
import Home from '~/pages/Home'
import Iframe from '~/pages/Iframe'
import Inject from '~/pages/Inject'

import history from '~/services/history'

import Route from './Route'

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
          <Route path="/auth/:guid+" component={Inject} />
          <Route path="/login" component={SignIn} />
          <Route path="/profile" component={Profile} />
          <Route
            path="/forgot-password/failure"
            component={ForgotPasswordFail}
          />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/expired-token" component={ExpiredToken} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/solucao/:solution" component={Iframe} isPrivate />

          <Route path="/" component={Home} isPrivate />
        </Switch>
      </HashRouter>
    </ConnectedRouter>
  )
}

export default Routes
