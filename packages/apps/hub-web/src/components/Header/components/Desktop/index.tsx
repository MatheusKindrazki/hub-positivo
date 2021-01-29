import React, { useCallback, useContext, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { openTour } from '~/store/modules/tour/actions'
import { signOut } from '~/store/modules/auth/actions'

import { useDisclosure } from '@hub/common/hooks'
import Welcome from '@hub/common/components/Welcome'
import Select from '@hub/common/components/Select'
import { Box, Button, Avatar, Menu } from '@hub/common/components'

import history from '~/services/history'

import ModalSupportContext from '~/components/ModalSupport/context'

import GlobalStyle from '../../styles'
import { useHeader } from '../../context'

const { MenuContainer, MenuButton, MenuList, MenuDivider, MenuItem } = Menu

const DesktopMenu: React.FC = () => {
  const dispatch = useDispatch()
  const { onOpen } = useContext(ModalSupportContext)

  const { schoolList, roleList, ...func } = useHeader()
  const { steps } = useSelector((state: Store.State) => state.tour)

  const { user } = useSelector((state: Store.State) => state.user)

  const handleSignOut = useCallback(async () => {
    dispatch(signOut())
    history.push('/login')
  }, [dispatch])

  const handleOpenTour = useCallback(() => {
    dispatch(openTour(true))
  }, [dispatch])

  const { setRole, setSchool, resetInfo, defaultValue } = func

  const { isOpen, onOpen: menuOpen, onClose: menuClose } = useDisclosure()

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
      <MenuContainer
        onClose={() => {
          menuClose()
          resetInfo()
        }}
        onOpen={menuOpen}
        isOpen={isOpen}
      >
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
            src=""
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
              avatar=""
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
              value={defaultValue.school}
              options={schoolList}
              onChange={e => setSchool(e as any)}
            />
          </Box>
          <Box px="4" pb="3">
            <Select
              key={String(defaultValue.role)}
              variant="normal"
              placeholder="Selecione"
              className="height-md"
              value={defaultValue.role}
              options={roleList}
              onChange={e => setRole(e as any)}
            />
          </Box>
          <MenuDivider />
          <Box px="5" py="3">
            <Button variant="link" color="gray.500" fontSize="0.875rem">
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
