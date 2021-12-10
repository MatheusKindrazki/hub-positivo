import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext
} from 'react'

import { toast } from '@psdhub/common/utils'
import HubContext from '@psdhub/common/layout/Provider/context'
import Loading from '@psdhub/common/components/BarLoader'

import { getAuth, setAuth } from '../services/storage'
import reducedTokenService from '../services/reducedToken'
import { sendAllInfos } from '../services/postInformation'
import authService, { UserAuthProps } from '../services/auth'
import { enableProfile, mockLevels } from '../components/Header'
import { SignInSuccess, LoggedData } from '../@types/auth'

export interface AuthContextParams {
  signed: boolean
  loading: boolean
  reducedToken?: string

  setLevel(e: any): void
  setStep(e: number): void
  setSigned(e: boolean): void
  signIn(data: UserAuthProps): void

  loggedData: LoggedData
  setLoggedData(data: LoggedData): void

  step: number

  data?: SignInSuccess
}

const AuthContext = createContext({} as AuthContextParams)

const AuthProvider: React.FC = ({ children }) => {
  const hubContext = useContext(HubContext)

  const [step, setStep] = useState(0)
  const [signed, setSigned] = useState(true)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<SignInSuccess>()
  const [reducedToken, setReducedToken] = useState('')
  const [loggedData, setLoggedData] = useState({} as LoggedData)

  useEffect(() => {
    setLoading(true)

    const informations = getAuth()

    setData(informations.data)
    setSigned(informations.signed)
    setReducedToken(informations.reducedToken)
    setLoggedData(informations.loggedData)

    if (informations?.signed) {
      sendAllInfos(informations)
      const { selected_profile } = informations.loggedData

      hubContext.theme({
        profile: selected_profile?.colorProfile as any
      })
    }

    setLoading(false)
  }, [hubContext])

  const handleSignIn = useCallback(async (data: UserAuthProps) => {
    setLoading(true)

    try {
      const response = await authService(data)
      setData(response)

      // ? indo para o STEP do PERFIL
      setStep(1)

      setLoading(false)
    } catch (error) {
      toast.error(
        'Erro ao fazer login, verifique seus dados e tente novamente!'
      )

      setLoading(false)
    }
  }, [])

  const handleSelectSchoolAndProfile = useCallback(
    async (d: LoggedData) => {
      setLoading(true)

      try {
        const response = await reducedTokenService({
          school_id: d.selected_school.id,
          token: data?.token || ''
        })

        setReducedToken(response.access_token)

        setSigned(true)

        // ? Salvando dados no storage
        setAuth({
          signed: true,
          data,
          reducedToken: response.access_token,
          loggedData: d
        })

        hubContext.theme({
          profile: d.selected_profile?.colorProfile as any
        })

        let sendClass = ''

        if (enableProfile.includes(d.selected_profile.id)) {
          sendClass = mockLevels[0].label
        }

        sendAllInfos({
          data,
          reducedToken: response.access_token,
          loggedData: d,
          class: sendClass
        })
      } catch (error) {
        toast.error(error as any)
      }

      setLoading(false)
      setLoggedData(d)
    },
    [data, hubContext]
  )

  const handleSelectedLevel = useCallback(
    data => {
      sendAllInfos({
        data,
        reducedToken: reducedToken,
        loggedData: loggedData,
        class: data?.label,
        level: data?.value || 'EM'
      })
    },
    [loggedData, reducedToken]
  )

  return (
    <AuthContext.Provider
      value={{
        data,
        step,
        signed,
        setStep,
        loading,
        setSigned,
        loggedData,
        reducedToken,
        signIn: handleSignIn,
        setLevel: handleSelectedLevel,
        setLoggedData: handleSelectSchoolAndProfile
      }}
    >
      <Loading height="4px" loading={loading} />
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
