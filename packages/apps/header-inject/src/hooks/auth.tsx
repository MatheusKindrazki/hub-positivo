import React, { createContext, useEffect } from 'react'

interface AuthProps {
  token: string | null
  product: string | null
}

const defaultValue = {
  product: null,
  token: null
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  useEffect(() => {
    const url = window.location.hash

    const storage = localStorage.getItem('@positivo:hub:auth:inject')

    if (!url.includes('auth') && !storage) {
      window.location.href =
        'https://api2.positivoon.com.br/hubdigital-front-dev/'

      console.log('HUB: Usuário sem autenticação')

      return
    }

    console.log('preparado para login')
  }, [])

  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
      <p></p>
    </AuthContext.Provider>
  )
}

export default AuthProvider

export { AuthContext }
