import React from 'react';

import TagManager, { TagManagerArgs } from 'react-gtm-module';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyle from './styles/global';

const tagManagerArgs: TagManagerArgs = {
  gtmId: 'GTM-PCPNTVS',
};

TagManager.initialize(tagManagerArgs);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  );
};

export default App;
