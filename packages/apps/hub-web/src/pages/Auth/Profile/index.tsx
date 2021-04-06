import React, { useCallback, useState, useMemo } from 'react'

import { orderBy } from 'lodash'

import { useSelector, useDispatch } from 'react-redux'

import { AccessData } from '~/store/modules/auth/types'
import { preparingUserData } from '~/store/modules/auth/actions'

import documentTitle from '@psdhub/common/utils/documentTitle'
import { Select, Box, Heading } from '@psdhub/common/components'

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

  const { info: user } = useSelector((state: Store.State) => state.user)

  const renderSchools = useMemo(
    () => orderBy(prepareSchool(user?.schools), 'label', 'asc'),
    [user]
  )

  const renderProfiles = useMemo(
    () => orderBy(prepareRoles(school?.roles), 'label', 'asc'),
    [school]
  )

  const handleSignInUser = useCallback(
    data => {
      dispatch(
        preparingUserData({
          selected_school: school as AccessData['selected_school'],
          profiles: renderProfiles,
          selected_profile: data,
          redirect: redirect || '/'
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
