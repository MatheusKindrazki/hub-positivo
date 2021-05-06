import React, { createContext, useState, useContext } from 'react'

import { SendInfos } from '@psdhub/helpers'

interface AuthContextParams {
  signed: boolean

  data?: SendInfos
}

const AuthContext = createContext({} as AuthContextParams)

const AuthProvider: React.FC = ({ children }) => {
  const [data] = useState({} as SendInfos)

  return (
    <AuthContext.Provider
      value={{
        signed: false,
        data
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextParams {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Provider de autenticação não encontrado!')
  }

  return context
}

export { useAuth }

export default AuthProvider
