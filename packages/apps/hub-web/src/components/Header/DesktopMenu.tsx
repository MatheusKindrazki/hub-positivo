import React, { useCallback, useMemo, useContext } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Avatar, Menu } from '@hub/common/components'
import Select from '@hub/common/components/Select'
import Welcome from '@hub/common/components/Welcome'

import ModalSupportContext from '~/components/ModalSupport/context'

import history from '~/services/history'
import { signOut } from '~/store/modules/auth/actions'
import { loading } from '~/store/modules/global/actions'
import { profiles, setProfile } from '~/store/modules/profile/actions'
import { Profiles } from '~/store/modules/profile/types'
import { openTour } from '~/store/modules/tour/actions'
import { setSchool } from '~/store/modules/user/actions'
import { prepareSchool, prepareRoles } from '~/utils/prepareSchoolAndRoles'

import GlobalStyle from './styles'

interface DesktopMenuProps {
  handleAlterPass: () => void
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ handleAlterPass }) => {
  const { onOpen } = useContext(ModalSupportContext)

  const { MenuContainer, MenuButton, MenuList, MenuDivider, MenuItem } = Menu

  const dispatch = useDispatch()

  const { user, school, avatar } = useSelector(
    (state: Store.State) => state.user
  )
  const profile = useSelector((state: Store.State) => state.profile)

  const renderSchools = useMemo(() => prepareSchool(user?.schools), [user])

  const renderProfiles = useMemo(() => prepareRoles(school?.roles), [school])

  const { steps } = useSelector((state: Store.State) => state.tour)

  const handleSelected = useCallback(
    data => {
      dispatch(setSchool(data))
    },
    [dispatch]
  )

  const handleSignOut = useCallback(async () => {
    dispatch(signOut())
    history.push('/login')
  }, [dispatch])

  const handleProfileSelect = useCallback(
    data => {
      dispatch(loading(true))

      setTimeout(() => {
        dispatch(loading(false))
        dispatch(
          setProfile({
            guid: data.id,
            name: data.title,
            profile: data.icon,
            colorProfile: data.colorProfile
          })
        )
      }, 1500)

      dispatch(profiles((renderProfiles as unknown) as Profiles))
    },
    [dispatch, renderProfiles]
  )

  const handleOpenTour = useCallback(() => {
    dispatch(openTour(true))
  }, [dispatch])

  return (
    <Box
      className="hub-logo"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {steps?.length && (
        <Button
          fontSize="0.875rem"
          backgroundColor="white"
          fontWeight="bold"
          color="blue.500"
          onClick={handleOpenTour}
          mx="1"
        >
          Fazer tour
        </Button>
      )}
      <Button
        id="header-suporte"
        fontSize="0.875rem"
        backgroundColor="white"
        fontWeight="bold"
        color="blue.500"
        onClick={onOpen}
        mx="1"
      >
        Estou com uma dúvida
      </Button>
      <MenuContainer>
        <MenuButton
          type="button"
          w="2.8125rem"
          background="transparent!important"
          style={{ zIndex: 9 }}
        >
          <Avatar
            width="2.6rem"
            color="#3C3C3C"
            height="2.5rem"
            backgroundColor="gray.400"
            name={user?.name || ''}
            src={avatar}
          />
        </MenuButton>
        <MenuList
          style={{ zIndex: 9 }}
          minW="310px"
          borderRadius="md"
          boxShadow="dark-lg"
          border="1px solid #D9D9D9"
          mr="2rem!important"
          top="8px!important"
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
              name={user?.name || ''}
              avatar={avatar}
              option="name"
              fontSize="1.125rem"
              size="48px"
              fontWeight="bold"
            />
          </Box>
          <MenuDivider />
          <Box px="4" pt="3" pb="3">
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
          <Box px="5" py="3">
            <Button
              variant="link"
              color="gray.500"
              fontSize="0.875rem"
              onClick={handleAlterPass}
            >
              Alterar minha senha
            </Button>
          </Box>
          <Box px="3" py="3" pt="0">
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
      <GlobalStyle />
    </Box>
  )
}

export default DesktopMenu
