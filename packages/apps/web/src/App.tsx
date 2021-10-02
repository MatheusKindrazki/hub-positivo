import React from 'react'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '~/store'

import { setReleaseId } from '@psdhub/newrelic'
import ThemeProvider from '@psdhub/common/layout/Provider'

import ModalSupport from '~/components/ModalSupport'

import GlobalStyle from '~/styles/global'
import Routes from '~/routes'

import '~/services/mixpanel/pageView'
import '~/middlewares/hadReAttempt'

const App: React.FC = () => {
  return (
    <ThemeProvider cssVarPrefix="hub">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
          <ModalSupport />
        </PersistGate>
      </Provider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

setReleaseId(process.env.REACT_APP_VERSION as string)

export default App
