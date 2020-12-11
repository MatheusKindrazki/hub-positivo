import React, { createContext, useContext, useEffect, useState } from 'react'

import BarLoader from '@hub/common/components/BarLoader'
import { useToast } from '@hub/common/hooks'

import getUserInfo, { UserInfoProps } from '../services/getUserInfo'
import validate from '../utils/findGuid'
import { getStorage, setStorage, removeStorage } from '../utils/localStorage'

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

  const [guid, setGuid] = useState<string | null>(null)
  const [released, setReleased] = useState<boolean>(false)

  const toast = useToast()

  const findGUID = setInterval(() => {
    const valid = validate(window.__HUB_GUID__)

    if (valid) {
      setGuid(valid)
      setReleased(true)
      clearInterval(findGUID)
    }
  }, [500])

  setTimeout(() => {
    clearInterval(findGUID)
    if (!released) {
      setReleased(true)
    }
  }, 4000)

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
      console.log(error)
      toast({
        title: 'Erro na autenticação, token inválido!',
        description: 'Você será redirecionado para o login novamente.',
        status: 'error',
        duration: 4000,
        onCloseComplete: () => {
          if (process.env.HEADER_REDIRECT === 'enabled') {
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

    const now = Math.round(+new Date() / 1000)

    if (now >= storage?.expire_in) {
      removeStorage()

      toast({
        title: 'Seu token expirou!',
        description: 'Faça o login novamente para continuar',
        duration: 4000,
        status: 'info',
        onCloseComplete: () => {
          if (process.env.HEADER_REDIRECT === 'enabled') {
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

    if (!released) return

    const storage = getStorage()

    if (!guid && !storage) {
      toast({
        title: 'Token não encontrado',
        description: 'Faça o login para continuar',
        duration: 4000,
        status: 'info',
        onCloseComplete: () => {
          if (process.env.HEADER_REDIRECT === 'enabled') {
            if (!window.location.host.includes('localhost')) {
              window.location.href = process.env.HUB_URL_FRONT || ''
            }
          }
        }
      })

      setLoading(false)

      return
    }

    if (guid) {
      authUser(guid)

      removeStorage()

      return
    }

    checkTokenValidity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guid, released])

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
