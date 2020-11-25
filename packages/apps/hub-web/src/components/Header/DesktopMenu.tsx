import React, { useCallback, useMemo, useState, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  Select,
  Box,
  Button,
  Avatar,
  Menu,
  Drawer,
  Welcome
} from '@hub/common/components'

import history from '~/services/history'
import { signOut } from '~/store/modules/auth/actions'
import { loading } from '~/store/modules/global/actions'
import { profiles, setProfile } from '~/store/modules/profile/actions'
import { Profiles } from '~/store/modules/profile/types'
import { setSchool } from '~/store/modules/user/actions'

const { MenuButton, MenuContainer, MenuDivider, MenuItem, MenuList } = Menu

const {
  useDisclosure,
  DrawerContainer,
  DrawerContent,
  DrawerCloseButton
} = Drawer

const DesktopMenu: React.FC = () => {
  const dispatch = useDispatch()

  const agendaRef = useRef(null)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [openProfile, setOpenProfile] = useState(false)
  const { user, school, avatar } = useSelector(
    (state: Store.State) => state.user
  )
  const profile = useSelector((state: Store.State) => state.profile)

  const handleSignOut = useCallback(() => {
    dispatch(signOut())
    history.push('/login')
  }, [dispatch])

  const handleOpenUserOption = useCallback(() => {
    setOpenProfile(!openProfile)
  }, [openProfile])

  const handleSelected = useCallback(
    data => {
      dispatch(setSchool(data))
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
      dispatch(loading(true))

      setTimeout(() => {
        dispatch(loading(false))
        dispatch(
          setProfile({
            name: data.title,
            profile: data.colorProfile
          })
        )

        setOpenProfile(false)
      }, 1500)

      dispatch(profiles((renderProfiles as unknown) as Profiles))
    },
    [dispatch, renderProfiles]
  )

  return (
    <>
      <Box
        className="hub-logo"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          fontSize="0.875rem"
          backgroundColor="white"
          fontWeight="bold"
          color="blue.500"
          mx="1"
          ref={agendaRef}
        >
          Tutorial
        </Button>
        <Button
          fontSize="0.875rem"
          backgroundColor="white"
          fontWeight="bold"
          mx="1"
          color="blue.500"
          ref={agendaRef}
          onClick={onOpen}
        >
          Agenda
        </Button>
        <MenuContainer isOpen={openProfile}>
          <MenuButton
            as={Button}
            w="2.8125rem"
            background="transparent!important"
            onClick={handleOpenUserOption}
            style={{ zIndex: 9 }}
          >
            <Avatar
              width="2.5rem"
              height="2.5rem"
              backgroundColor="gray.400"
              name={user?.name || ''}
              src={avatar}
            />
          </MenuButton>
          <MenuList
            style={{ zIndex: 9 }}
            minW="300px"
            borderRadius="4px"
            boxShadow="sm"
            mr="2rem!important"
            top="8px!important"
            onMouseLeave={() => setOpenProfile(false)}
          >
            <MenuItem
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                opacity: 0
              }}
            ></MenuItem>
            <Box px="4" py="2" w="100%" h="auto">
              <Welcome
                option="name"
                fontSize="1.125rem"
                size="40px"
                fontWeight="bold"
                name="Matheus Kindrazki"
              />
            </Box>
            <MenuDivider />
            <Box px="4" pt="3" pb="1">
              <Select
                variant="normal"
                placeholder="Selecione"
                className="height-md"
                value={school}
                options={renderSchools}
                onChange={handleSelected}
              />
            </Box>
            <Box px="4" pb="3">
              <Select
                variant="normal"
                placeholder="Selecione"
                className="height-md"
                options={renderProfiles.map(item => ({
                  label: item.title,
                  value: (item.id as unknown) as string,
                  ...item
                }))}
                value={{
                  label: profile.name as string,
                  value: profile.profile as string
                }}
                onChange={handleProfileSelect}
              />
            </Box>
            <MenuDivider />
            <Box px="4" py="3">
              <Button
                variant="link"
                color="gray.500"
                fontSize="0.875rem"
                onClick={handleSignOut}
              >
                Sair
              </Button>
            </Box>
          </MenuList>
        </MenuContainer>
      </Box>
      <DrawerContainer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={agendaRef}
      >
        <DrawerContent mt={['0', '72px']}>
          <DrawerCloseButton></DrawerCloseButton>
        </DrawerContent>
      </DrawerContainer>
    </>
  )
}

export default DesktopMenu
