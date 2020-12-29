import React, { useCallback, useImperativeHandle, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Select, Welcome } from '@hub/common/components'
import Drawer from '@hub/common/components/Drawer'
import Menu from '@hub/common/components/Menu'

import history from '~/services/history'
import { removeAllFrames } from '~/services/sessionStorage'
import { signOut } from '~/store/modules/auth/actions'
import { loading } from '~/store/modules/global/actions'
import { profiles, setProfile } from '~/store/modules/profile/actions'
import { Profiles } from '~/store/modules/profile/types'
import { openTour } from '~/store/modules/tour/actions'
import { setSchool } from '~/store/modules/user/actions'
import { prepareRoles, prepareSchool } from '~/utils/prepareSchoolAndRoles'

export interface RefMenuProps {
  openMenu: () => void
}

const { MenuDivider } = Menu
const { useDisclosure, DrawerContainer, DrawerContent } = Drawer

const MobileMenu = React.forwardRef<RefMenuProps>((_, ref) => {
  const dispatch = useDispatch()

  const { user, school, avatar } = useSelector(
    (state: Store.State) => state.user
  )

  const { isOpen, onClose, onOpen } = useDisclosure()

  const profile = useSelector((state: Store.State) => state.profile)

  const renderSchools = useMemo(() => prepareSchool(user?.schools), [user])

  const renderProfiles = useMemo(() => prepareRoles(school?.roles), [school])

  const openMenu = (): void => {
    if (!isOpen) {
      onOpen()
    } else {
      onClose()
    }
  }

  useImperativeHandle(ref, () => {
    return {
      openMenu
    }
  })

  const handleSelected = useCallback(
    data => {
      dispatch(setSchool(data))
    },
    [dispatch]
  )

  const handleProfileSelect = useCallback(
    data => {
      dispatch(loading(true))

      onClose()

      setTimeout(() => {
        dispatch(loading(false))
        dispatch(
          setProfile({
            guid: data.id,
            name: data.title,
            profile: data.profile,
            colorProfile: data.colorProfile
          })
        )
      }, 1500)

      dispatch(profiles((renderProfiles as unknown) as Profiles))
    },
    [dispatch, onClose, renderProfiles]
  )

  const handleClosed = useCallback(async () => {
    await removeAllFrames()

    dispatch(signOut())

    history.push('/')
  }, [dispatch])

  const handleOpenTour = useCallback(() => {
    onClose()
    dispatch(openTour(true))
  }, [dispatch, onClose])

  const handleNeedHelp = () => {
    window.location.href = 'https://suporte.positivoon.com.br/portal/pt/home'
  }

  return (
    <>
      <Box
        className="hub-logo"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      ></Box>
      <DrawerContainer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent mt={['72px', '72px']} position="relative">
          <Box px="4" py="2" w="100%" h="auto">
            <Welcome
              option="name"
              name={user?.name || ''}
              fontSize="1.125rem"
              size="40px"
              avatar={avatar || ''}
              fontWeight="bold"
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
                value: profile.guid as string
              }}
              onChange={handleProfileSelect}
            />
          </Box>
          <MenuDivider />
          <Box px="4" py="3">
            {/* <Button
              variant="ghost"
              width="100%"
              alignItems="center"
              justifyContent="flex-start"
              color="gray.500"
              ml="-10px"
              _hover={{
                color: 'blue.500',
                backgroundColor: 'gray.200'
              }}
              fontSize="0.875rem"
            >
              Início
            </Button> */}
            {profile.guid === 'PROFESSOR' && (
              <Button
                variant="ghost"
                width="100%"
                alignItems="center"
                justifyContent="flex-start"
                color="gray.500"
                ml="-10px"
                onClick={handleOpenTour}
                _hover={{
                  color: 'blue.500',
                  backgroundColor: 'gray.200'
                }}
                fontSize="0.875rem"
              >
                Fazer tour
              </Button>
            )}
            <Button
              variant="ghost"
              width="100%"
              alignItems="center"
              justifyContent="flex-start"
              color="gray.500"
              ml="-10px"
              onClick={handleNeedHelp}
              _hover={{
                color: 'blue.500',
                backgroundColor: 'gray.200'
              }}
              fontSize="0.875rem"
            >
              Estou com uma dúvida
            </Button>
          </Box>
          <Box px="4" py="3" bottom="80px" left="0" width="100%">
            <MenuDivider />
            <Button
              onClick={handleClosed}
              variant="link"
              color="gray.500"
              fontSize="0.875rem"
            >
              Sair
            </Button>
          </Box>
        </DrawerContent>
      </DrawerContainer>
    </>
  )
})

export default MobileMenu
