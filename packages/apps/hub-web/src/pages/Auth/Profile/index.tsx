import React, { useEffect, useCallback, useState, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Select, Box, Heading } from '@hub/common/components'
import documentTitle from '@hub/common/utils/documentTitle'

import history from '~/services/history'
import { setSigned } from '~/store/modules/auth/actions'
import { setProfile, profiles } from '~/store/modules/profile/actions'
import { Profiles } from '~/store/modules/profile/types'
import { setSchool as setSchoolUser } from '~/store/modules/user/actions'
import { prepareRoles, prepareSchool } from '~/utils/prepareSchoolAndRoles'

import CardBox, { Icons } from './Components/CardBox'

interface SelectItem {
  label: string
  value: string
  roles: string[]
}

const Profile: React.FC = () => {
  documentTitle('Selecione o Perfil')

  const dispatch = useDispatch()
  const [school, setSchool] = useState<SelectItem>()

  const { token } = useSelector((state: Store.State) => state.auth)
  const { user } = useSelector((state: Store.State) => state.user)

  useEffect(() => {
    !token && history.push('/login')
  }, [token])

  const renderSchools = useMemo(() => prepareSchool(user?.schools), [user])

  const renderProfiles = useMemo(() => prepareRoles(school?.roles), [school])

  const handleSelected = useCallback(
    data => {
      dispatch(setSchoolUser(data))

      setSchool(data)
    },
    [dispatch]
  )

  const handleProfileSelect = useCallback(
    data => {
      dispatch(setSigned())

      dispatch(
        setProfile({
          guid: data.id,
          name: data.title,
          profile: data.profile,
          colorProfile: data.colorProfile
        })
      )

      dispatch(profiles((renderProfiles as unknown) as Profiles))

      history.push('/')
    },
    [dispatch, renderProfiles]
  )

  return (
    <Box p="6">
      <Heading color="black" fontSize="xl" mb="2">
        Selecione sua escola e acesso
      </Heading>
      <Select
        variant="normal"
        placeholder="Selecione"
        onChange={handleSelected}
        options={renderSchools}
      />

      {school && (
        <Box mt="3" pt="3">
          {renderProfiles.map((item, i) => (
            <CardBox
              key={String(i)}
              icon={item.icon as Icons}
              title={item.title}
              onClick={() => handleProfileSelect(item)}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Profile
