import React, {
  createContext,
  useMemo,
  useCallback,
  useContext,
  useState,
  useEffect
} from 'react'

import { orderBy } from 'lodash'

import { prepareRoles, prepareSchool } from '@psdhub/common/utils'

import { ContextHeaderProps, SelectProps } from './types'
import { STORAGE_KEY } from '../../../../services/storage'
import { useAuth } from '../../../../context/authContext'
import { Schools } from '../../../../@types/auth'

const HeaderContext = createContext({} as ContextHeaderProps)

const HeaderProvider: React.FC = ({ children }) => {
  const { data, loggedData, setSigned, setStep, setLoggedData } = useAuth()

  const [roles, setRoles] = useState(loggedData?.selected_school?.roles)

  const [role, setRole] = useState<SelectProps | undefined>()
  const [school, setSchool] = useState<SelectProps | undefined>()

  useEffect(() => {
    setRole({
      label: loggedData?.selected_profile?.name,
      value: loggedData?.selected_profile?.icon as string
    })
    setSchool({
      ...loggedData?.selected_school
    })
  }, [loggedData])

  const handleSetSchool = useCallback(data => {
    setSchool(data)
    setRoles(data.roles)
    setRole(undefined)
  }, [])

  const handleResetInfo = useCallback(() => {
    setSchool({
      ...loggedData?.selected_school
    })
    setRole({
      label: loggedData?.selected_profile?.name,
      value: loggedData?.selected_profile?.colorProfile as string
    })
    setRoles(loggedData?.selected_school?.roles)
  }, [loggedData])

  // ? Lista de escolas e perfis
  const schoolList = useMemo(() => {
    const schools = prepareSchool(data?.info?.schools)

    return orderBy(schools, 'label', 'asc')
  }, [data])

  const roleList = useMemo(() => {
    const profiles = prepareRoles(roles)

    return orderBy(profiles, 'label', 'asc')
  }, [roles])

  const setRoleAndDispatchRequest = useCallback(
    data => {
      setRole(data)

      setLoggedData({
        profiles: roleList,
        selected_profile: data,
        selected_school: school as Schools
      })
    },
    [roleList, school, setLoggedData]
  )

  const handleSignOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)

    setStep(0)
    setSigned(false)
  }, [setSigned, setStep])

  return (
    <HeaderContext.Provider
      value={{
        userName: data?.info?.name as string,
        schoolList,
        roleList,
        signOut: handleSignOut,
        setSchool: handleSetSchool,
        setRole: setRoleAndDispatchRequest,
        resetInfo: handleResetInfo,
        defaultValue: {
          school: school,
          role: role
        }
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

function useHeader(): ContextHeaderProps {
  const context = useContext(HeaderContext)

  if (!context) {
    throw new Error('É obrigatório o usuário do Provider')
  }

  return context
}

export { useHeader, HeaderProvider }
