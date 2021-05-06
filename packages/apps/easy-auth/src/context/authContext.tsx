import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext
} from 'react'

import { SendInfos } from '@psdhub/helpers'
import { toast } from '@psdhub/common/utils'
import Loading from '@psdhub/common/components/BarLoader'

import { getAuth } from '../services/storage'
import authService, { UserAuthProps } from '../services/auth'

export interface AuthContextParams {
  signed: boolean
  loading: boolean

  signIn(data: UserAuthProps): void

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

  const handleSignIn = useCallback(async (data: UserAuthProps) => {
    setLoading(true)

    try {
      const response = await authService(data)

      console.log('brasil', process.env)

      console.log(response)

      setLoading(false)
    } catch (error) {
      toast.error(
        'Erro ao fazer login, verifique seus dados e tente novamente!'
      )

      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signed,
        loading,
        signIn: handleSignIn,
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
