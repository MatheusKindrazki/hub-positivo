import React, { useCallback, useState, useMemo } from 'react'

import { prepareRoles, prepareSchool } from '@psdhub/common/utils'
import ProfileItem, { Icons } from '@psdhub/common/components/ProfileItem'
import { Box, Heading, Select } from '@psdhub/common/components'

import { useAuth } from '../../context/authContext'
import { Schools } from '../../@types/auth'

interface SelectItem {
  label: string
  value: string
  roles: string[]
}

const Profile: React.FC = () => {
  const [school, setSchool] = useState<SelectItem>()

  const { data, setLoggedData } = useAuth()

  const renderSchools = useMemo(
    () => prepareSchool(data?.info?.schools),
    [data]
  )

  const renderProfiles = useMemo(() => prepareRoles(school?.roles), [school])

  const handleSignInUser = useCallback(
    data => {
      setLoggedData({
        profiles: renderProfiles,
        selected_profile: data,
        selected_school: school as Schools
      })
    },
    [renderProfiles, school, setLoggedData]
  )

  return (
    <Box pb="6">
      <Heading color="black" fontSize="medium" mb="2">
        Selecione sua escola e acesso
      </Heading>
      <Select
        variant="normal"
        placeholder="Selecione"
        options={renderSchools}
        onChange={data => setSchool(data as SelectItem)}
      />
      <Box overflow="hidden">
        {school && (
          <Box mt="3" pt="3" pl="2">
            {renderProfiles.map((item, i) => (
              <ProfileItem
                key={String(i)}
                icon={item.icon as Icons}
                title={item.name}
                onClick={() => handleSignInUser(item)}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Profile
