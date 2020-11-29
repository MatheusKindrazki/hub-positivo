import React, { useContext, useEffect } from 'react'

import { useSelector } from 'react-redux'

import ThemeContext from '@hub/common/layout/Provider/context'
import { VariantsProps } from '@hub/common/layout/styles/colors'

import { ConnectedRouter } from 'connected-react-router'
import { Switch } from 'react-router'

import Profile from '~/pages/Auth/Profile'
import SignIn from '~/pages/Auth/SignIn'
import Home from '~/pages/Home'

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
      <div className="hub-color">
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/profile" component={Profile} />

          <Route path="/" component={Home} isPrivate />
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

export default Routes
