import React, { useCallback, useImperativeHandle, useContext } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { openTour } from '~/store/modules/tour/actions'
import { signOut } from '~/store/modules/auth/actions'

import { useTheme } from '@hub/common/layout/styles'
import Menu from '@hub/common/components/Menu'
import { List } from '@hub/common/components/Icons'
import Drawer from '@hub/common/components/Drawer'
import { Box, Button, Select, Welcome } from '@hub/common/components'

import history from '~/services/history'

import ModalSupportContext from '~/components/ModalSupport/context'

export interface RefMenuProps {
  openMenu: () => void
}

export interface MenuProps {
  openModalPass: () => void
}

const { MenuDivider } = Menu
const { useDisclosure, DrawerContainer, DrawerContent } = Drawer

interface MenuPropsButton {
  onClick: () => void
}

export const MenuButton: React.FC<MenuPropsButton> = ({ onClick }) => {
  const { colors } = useTheme()
  return (
    <Button
      onClick={onClick}
      backgroundColor="transparent!important"
      ml="-0.625rem"
      width="auto"
    >
      <List color={colors.blue[500]} size={24} />
    </Button>
  )
}

const MobileMenu = React.forwardRef<RefMenuProps, MenuProps>(
  ({ openModalPass }, ref) => {
    const dispatch = useDispatch()

    const { onOpen: openModalSupport } = useContext(ModalSupportContext)

    const { user, school, avatar } = useSelector(
      (state: Store.State) => state.user
    )

    const { isOpen, onClose, onOpen } = useDisclosure()
    const profile = useSelector((state: Store.State) => state.profile)

    const { steps } = useSelector((state: Store.State) => state.tour)

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

    const handleClosed = useCallback(async () => {
      dispatch(signOut())

      history.push('/')
    }, [dispatch])

    const handleOpenTour = useCallback(() => {
      onClose()
      dispatch(openTour(true))
    }, [dispatch, onClose])

    return (
      <>
        <Box
          className="hub-logo"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        ></Box>
        <DrawerContainer
          isOpen={isOpen}
          placement="left"
          onClose={() => onClose()}
        >
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
                options={[]}
                onChange={() => console.log('')}
              />
            </Box>
            <Box px="4" pb="3">
              <Select
                variant="normal"
                placeholder="Selecione"
                className="height-md"
                options={[]}
                value={[]}
                onChange={() => console.log('')}
              />
            </Box>
            <MenuDivider />
            <Box
              px="4"
              py="3"
              d="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              bottom="80px"
              left="0"
              width="100%"
            >
              {steps?.length && (
                <Button
                  onClick={handleOpenTour}
                  variant="link"
                  color="gray.500"
                  fontWeight="500"
                  fontSize="0.875rem"
                  ml="2"
                  mb="2"
                >
                  Fazer tour
                </Button>
              )}
              <Button
                id="header-suporte"
                variant="ghost"
                width="100%"
                alignItems="center"
                justifyContent="flex-start"
                onClick={openModalSupport}
                color="gray.500"
                fontWeight="500"
                ml="-10px"
                _hover={{
                  color: 'blue.500',
                  backgroundColor: 'gray.200'
                }}
                fontSize="0.875rem"
              >
                Estou com uma dúvida
              </Button>
            </Box>
            <MenuDivider />
            <Box
              px="4"
              py="3"
              bottom="80px"
              left="0"
              width="100%"
              d="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Button
                onClick={openModalPass}
                color="gray.500"
                fontSize="0.875rem"
                variant="ghost"
                ml="-10px"
              >
                Alterar minha senha
              </Button>
              <Button
                onClick={handleClosed}
                variant="ghost"
                ml="-10px"
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
  }
)

export default MobileMenu
