import React from 'react'

import HubProvider from '@psdhub/common/layout/Provider'

import AuthProvider from './context/authContext'
import ModalLogin from './components/ModalLogin'

const App: React.FC = () => {
  return (
    <HubProvider cssVarPrefix="hub-easyauth">
      <AuthProvider>
        <ModalLogin />
      </AuthProvider>
    </HubProvider>
  )
}

export default App
