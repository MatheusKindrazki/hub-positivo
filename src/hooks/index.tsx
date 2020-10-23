import React from 'react';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '~/store';

import ThemeProvider from './ThemeContainer';

const AppProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>{children}</ThemeProvider>
    </PersistGate>
  </Provider>
);

export default AppProvider;
