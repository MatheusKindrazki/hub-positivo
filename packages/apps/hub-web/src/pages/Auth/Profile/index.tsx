import React, { useEffect, useCallback, useState, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { BarLoader, Select, Box, Heading } from '@hub/common/components'
import documentTitle from '@hub/common/utils/documentTitle'

import history from '~/services/history'
import { setSigned } from '~/store/modules/auth/actions'
import { setProfile, profiles } from '~/store/modules/profile/actions'
import { Profiles } from '~/store/modules/profile/types'
import { setSchool as setSchoolUser } from '~/store/modules/user/actions'

import CardBox from './Components/CardBox'

interface SelectItem {
  label: string
  value: string
  roles: string[]
}

const Profile: React.FC = () => {
  documentTitle('Selecione o Perfil')

  const dispatch = useDispatch()
  const [school, setSchool] = useState<SelectItem>()
  const [loading, setLoading] = useState(false)

  const { token } = useSelector((state: Store.State) => state.auth)
  const { user } = useSelector((state: Store.State) => state.user)

  useEffect(() => {
    if (!token) {
      history.push('/')
    }
  }, [token])

  const handleSelected = useCallback(
    data => {
      setLoading(true)
      dispatch(setSchoolUser(data))

      setTimeout(() => {
        setLoading(false)
        setSchool(data)
      }, 1000)
    },
    [dispatch]
  )

  const renderSchools = useMemo(() => {
    if (!user?.schools?.length) return []

    return user?.schools?.map(s => ({
      value: s.id,
      label: s.name,
      roles: s.roles
    }))
  }, [user])

  const renderProfiles = useMemo(() => {
    if (!school?.roles.length) return []

    return school.roles.map(i => ({
      title: i,
      icon: i.toLowerCase(),
      colorProfile: i.toLowerCase(),
      id: String(i.toLowerCase())
    }))
  }, [school])

  const handleProfileSelect = useCallback(
    data => {
      dispatch(setSigned())

      dispatch(
        setProfile({
          name: data.title,
          profile: data.colorProfile
        })
      )

      dispatch(profiles((renderProfiles as unknown) as Profiles))

      history.push('/')
    },
    [dispatch, renderProfiles]
  )

  return (
    <>
      <BarLoader loading={loading} />
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

        {!loading && school ? (
          <Box mt="3" pt="3">
            {renderProfiles.map((item, i) => (
              <CardBox
                key={i}
                icon={item.icon as any}
                title={item.title}
                onClick={() => handleProfileSelect(item)}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Profile
