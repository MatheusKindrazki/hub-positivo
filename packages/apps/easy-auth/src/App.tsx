import React from 'react'

import HubProvider from '@psdhub/common/layout/Provider'

import AuthProvider from './context/authContext'
import ModalLogin from './components/ModalLogin'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <HubProvider cssVarPrefix="hub-easyauth">
      <AuthProvider>
        <ModalLogin />
        <Header />
      </AuthProvider>
    </HubProvider>
  )
}

export default App
