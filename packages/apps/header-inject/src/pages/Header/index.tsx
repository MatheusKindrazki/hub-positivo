import React from 'react'

import Header from '../../components/Header'
import AuthProvider from '../../hooks/auth'

const HeaderPage: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  )
}

export default HeaderPage
