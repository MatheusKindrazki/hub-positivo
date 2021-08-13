import React, { useContext, useEffect, Suspense } from 'react'

import { Switch, HashRouter, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import { useSelector } from 'react-redux'

import { VariantsProps } from '@psdhub/common/layout/styles/colors'
import { useColorMode } from '@psdhub/common/layout/styles'
import ThemeContext from '@psdhub/common/layout/Provider/context'

import history from '~/services/history'

import routes from './routes'
import Route from './Route'

const Routes: React.FC = () => {
  const { colorProfile } = useSelector((state: Store.State) => state.profile)
  const { setColorMode } = useColorMode()

  setColorMode('light')

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
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
            <Redirect to="/" from="*" />
          </Switch>
        </HashRouter>
      </ConnectedRouter>
    </Suspense>
  )
}

export default Routes
