import React, {
  createContext,
  useMemo,
  useCallback,
  useContext,
  useState
} from 'react'

import { orderBy } from 'lodash'

import { useDispatch } from 'react-redux'

import { AccessData } from '~/store/modules/auth/types'
import { preparingUserData } from '~/store/modules/auth/actions'
import { store } from '~/store'

import { prepareRoles, prepareSchool } from '~/utils/prepareSchoolAndRoles'

import { ContextHeaderProps, SelectProps } from './types'

const HeaderContext = createContext({} as ContextHeaderProps)

const HeaderProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const { info: user, school: userSchool } = store.getState().user
  const { name, profile } = store.getState().profile

  const [roles, setRoles] = useState(userSchool?.roles)

  const [role, setRole] = useState<SelectProps | undefined>({
    label: name as string,
    value: profile as string
  })

  const [school, setSchool] = useState<SelectProps | undefined>({
    ...userSchool,
    label: userSchool?.label as string,
    value: userSchool?.value as string
  })

  const handleSetSchool = useCallback(data => {
    setSchool(data)
    setRoles(data.roles)
    setRole(undefined)
  }, [])

  const handleResetInfo = useCallback(() => {
    setSchool({
      ...userSchool,
      label: userSchool?.label as string,
      value: userSchool?.value as string
    })
    setRole({
      label: name as string,
      value: profile as string
    })
    setRoles(userSchool?.roles)
  }, [name, profile, userSchool])

  // ? Lista de escolas e perfis
  const schoolList = useMemo(() => {
    const schools = prepareSchool(user?.schools)

    return orderBy(schools, 'label', 'asc')
  }, [user])

  const roleList = useMemo(() => {
    const profiles = prepareRoles(roles)

    return orderBy(profiles, 'label', 'asc')
  }, [roles])

  const setRoleAndDispatchRequest = useCallback(
    data => {
      setRole(data)

      dispatch(
        preparingUserData({
          selected_profile: data,
          profiles: roleList,
          selected_school: school as AccessData['selected_school']
        })
      )
    },
    [dispatch, roleList, school]
  )

  return (
    <HeaderContext.Provider
      value={{
        schoolList,
        roleList,
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

export { useHeader, HeaderProvider, HeaderContext }
