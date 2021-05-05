import React from 'react'

import HubProvider from '@psdhub/common/layout/Provider'

import ModalLogin from './components/ModalLogin'

const App: React.FC = () => {
  return (
    <HubProvider cssVarPrefix="hub-easyauth">
      <ModalLogin />
    </HubProvider>
  )
}

export default App
