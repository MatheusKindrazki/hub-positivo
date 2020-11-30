import React, { createContext, useEffect, useState } from 'react'

import BarLoader from '@hub/common/components/BarLoader'

import { useToast } from '@chakra-ui/react'
import { useParams } from 'react-router'

import getUserInfo, { UserInfoProps } from '../services/getUserInfo'
import { getStorage, setStorage } from '../utils/localStorage'

interface AuthProps {
  token: string | null
  product: string | null
}

const defaultValue = {
  product: null,
  token: null
}

interface RouteParams {
  guid?: string
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  const params = useParams<RouteParams>()

  async function authUser(guid: string): Promise<void> {
    try {
      const userInfo: UserInfoProps = await getUserInfo(guid)

      setStorage<UserInfoProps>(userInfo)
    } catch (error) {
      toast({
        title: 'Erro na autenticação, token inválido!',
        description: 'Você será redirecionado para o login novamente.',
        status: 'error',
        duration: 4000
      })

      setTimeout(() => {
        // window.location.href = process.env.HUB_URL_FRONT || ''
      }, 5000)
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)

    const storage = getStorage()

    if (!params?.guid && !storage) {
      window.location.href = process.env.HUB_URL_FRONT || ''

      console.log('HUB: Usuário sem autenticação')
    }

    const guid = params?.guid || ''

    authUser(guid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <AuthContext.Provider value={defaultValue}>
      <BarLoader loading={loading} />
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export { AuthContext }
