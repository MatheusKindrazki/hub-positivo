import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import history from '~/services/history';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <AppProvider>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Routes />
          <GlobalStyle />
        </BrowserRouter>
      </ConnectedRouter>
    </AppProvider>
  );
};

export default App;
