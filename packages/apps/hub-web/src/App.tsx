import React from 'react'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import ThemeProvider from '@hub/common/layout/Provider'

import { ToastContainer } from 'react-toastify'

import Routes from '~/routes'
import { store, persistor } from '~/store'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            style={{
              borderRadius: 8
            }}
            limit={3}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App
