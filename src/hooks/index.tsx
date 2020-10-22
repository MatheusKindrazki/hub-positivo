import React from 'react';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from 'styled-components';

import { store, persistor } from '~/store';
import { theme } from '~/styles';

const AppProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </PersistGate>
  </Provider>
);

export default AppProvider;
