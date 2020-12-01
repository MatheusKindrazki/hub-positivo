import React, { createContext, useEffect, useState } from 'react'

import BarLoader from '@hub/common/components/BarLoader'

import { useToast } from '@chakra-ui/react'

import getUserInfo, { UserInfoProps } from '../services/getUserInfo'
import { getStorage, setStorage } from '../utils/localStorage'

interface AuthProps {
  token: string | null
  product: string | null
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const toast = useToast()

  async function authUser(guid: string): Promise<void> {
    try {
      const userInfo: UserInfoProps = await getUserInfo(guid)

      setToken(userInfo.token)

      setProduct(userInfo.product)

      setStorage<UserInfoProps>(userInfo)
    } catch (error) {
      toast({
        title: 'Erro na autenticação, token inválido!',
        description: 'Você será redirecionado para o login novamente.',
        status: 'error',
        duration: 4000,
        onCloseComplete: () => {
          if (process.env.NODE_ENV === 'production') {
            if (!window.location.host.includes('localhost')) {
              window.location.href = process.env.HUB_URL_FRONT || ''
            }
          }
        }
      })
    }

    setLoading(false)
  }

  function checkTokenValidity(): void {
    const storage = getStorage() as UserInfoProps

    const date = (new Date() as unknown) as number

    const now = Math.round(date / 1000)

    if (now >= storage?.expire_in) {
      toast({
        title: 'Seu token expirou!',
        description: 'Faça o login novamente para continuar',
        duration: 4000,
        status: 'info',
        onCloseComplete: () => {
          if (process.env.NODE_ENV === 'production') {
            if (!window.location.host.includes('localhost')) {
              window.location.href = process.env.HUB_URL_FRONT || ''
            }
          }
        }
      })

      setLoading(false)

      window.__HUB_IS_LOADED__ = true

      return
    }

    setToken(storage.token)
    setToken(storage.product)

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)

    const storage = getStorage()

    if (!window.__HUB_GUID__ && !storage) {
      if (process.env.NODE_ENV === 'production') {
        if (!window.location.host.includes('localhost')) {
          window.location.href = process.env.HUB_URL_FRONT || ''
        }
      }

      console.log('HUB: Usuário sem autenticação')

      setLoading(false)

      return
    }

    if (window.__HUB_GUID__) {
      const guid = window.__HUB_GUID__ || ''

      console.log('HUB: Autênticando usuário')

      authUser(guid)

      return
    }

    console.log('HUB: Validando token')
    checkTokenValidity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ product, token }}>
      <BarLoader loading={loading} />
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export { AuthContext }

export type { AuthProps }
