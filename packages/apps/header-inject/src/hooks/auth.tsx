import React, { createContext, useContext, useEffect, useState } from 'react'

import BarLoader from '@hub/common/components/BarLoader'
import { useToast } from '@hub/common/hooks'

import getUserInfo, { UserInfoProps } from '../services/getUserInfo'
import { getStorage, setStorage } from '../utils/localStorage'

interface AuthProps {
  token: string
  product: string
  profile: string
  levelEducation?: string | null
}

export const AuthContext = createContext<AuthProps>({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<AuthProps>({} as AuthProps)

  const toast = useToast()

  async function authUser(guid: string): Promise<void> {
    try {
      const userInfo: UserInfoProps = await getUserInfo(guid)

      setInfo({
        product: userInfo.product,
        token: userInfo.token,
        profile: userInfo?.logged_in?.profile,
        levelEducation: userInfo?.logged_in?.school?.class || null
      })

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

      return
    }

    setInfo({
      product: storage.product,
      token: storage.token,
      profile: storage?.logged_in?.profile,
      levelEducation: storage?.logged_in?.school?.class || null
    })

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)

    const storage = getStorage()

    if (!window.__HUB_GUID__ && !storage) {
      toast({
        title: 'Token não encontrado',
        description: 'Faça o login para continuar',
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

      return
    }

    if (window.__HUB_GUID__) {
      const guid = window.__HUB_GUID__ || ''
      authUser(guid)

      return
    }

    checkTokenValidity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        product: info.product,
        levelEducation: info.levelEducation,
        profile: info.profile,
        token: info.token
      }}
    >
      <BarLoader loading={loading} />
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthProps {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Para usar o useAuth, é obrigatório o usuário do Provider')
  }

  return context
}

export { AuthProvider, useAuth }
