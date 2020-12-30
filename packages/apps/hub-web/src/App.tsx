import React from 'react'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import ThemeProvider from '@hub/common/layout/Provider'

import ModalSupport from '~/components/ModalSupport'

import Routes from '~/routes'
import { store, persistor } from '~/store'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
          <ModalSupport />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App
