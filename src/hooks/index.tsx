import React from 'react';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { ToastContainer } from 'react-toastify';

import { store, persistor } from '~/store';

import ThemeProvider from './ThemeContainer';

const AppProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        style={{
          borderRadius: 8,
        }}
        limit={3}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ThemeProvider>{children}</ThemeProvider>
    </PersistGate>
  </Provider>
);

export default AppProvider;
