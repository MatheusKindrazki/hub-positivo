import React, { useCallback, useState, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { AccessData } from '~/store/modules/auth/types'
import { preparingUserData } from '~/store/modules/auth/actions'

import documentTitle from '@hub/common/utils/documentTitle'
import { Select, Box, Heading } from '@hub/common/components'

import { prepareRoles, prepareSchool } from '~/utils/prepareSchoolAndRoles'

import useQuery from '~/hooks/useQuery'

import CardBox, { Icons } from './Components/CardBox'

interface SelectItem {
  label: string
  value: string
  roles: string[]
}

const Profile: React.FC = () => {
  documentTitle('Selecione o Perfil')

  const query = useQuery()

  const redirect = query.get('redirect') || undefined

  const dispatch = useDispatch()

  const [school, setSchool] = useState<SelectItem>()

  const { user } = useSelector((state: Store.State) => state.user)

  const renderSchools = useMemo(() => prepareSchool(user?.schools), [user])

  const renderProfiles = useMemo(() => prepareRoles(school?.roles), [school])

  const handleSignInUser = useCallback(
    data => {
      dispatch(
        preparingUserData({
          selected_school: school as AccessData['selected_school'],
          profiles: renderProfiles,
          selected_profile: data,
          redirect: redirect
        })
      )
    },
    [dispatch, redirect, renderProfiles, school]
  )

  return (
    <Box p="6">
      <Heading color="black" fontSize="xl" mb="2">
        Selecione sua escola e acesso
      </Heading>
      <Select
        variant="normal"
        placeholder="Selecione"
        options={renderSchools}
        onChange={data => setSchool(data as SelectItem)}
      />

      {school && (
        <Box mt="3" pt="3">
          {renderProfiles.map((item, i) => (
            <CardBox
              key={String(i)}
              icon={item.icon as Icons}
              title={item.name}
              onClick={() => handleSignInUser(item)}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Profile
