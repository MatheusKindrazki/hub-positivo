import React, { createContext, useState, useEffect, useContext } from 'react'

import { SendInfos } from '@psdhub/helpers'
import Loading from '@psdhub/common/components/BarLoader'

import { getAuth } from '../services/storage'

export interface AuthContextParams {
  signed: boolean

  data?: SendInfos
}

const AuthContext = createContext({} as AuthContextParams)

const AuthProvider: React.FC = ({ children }) => {
  const [data, seData] = useState({} as SendInfos)
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const informations = getAuth()

    setSigned(!!informations.signed)

    seData(informations.data as SendInfos)

    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signed,
        data
      }}
    >
      <Loading loading={loading} />
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
