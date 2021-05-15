import React from 'react'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '~/store'

import ThemeProvider from '@psdhub/common/layout/Provider'

import ModalSupport from '~/components/ModalSupport'

import GlobalStyle from '~/styles/global'
import Routes from '~/routes'

import '~/services/mixpanel/pageView'

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

export default App
