import React, { useCallback, useEffect, useRef } from 'react'

import Headroom from 'react-headroom'
import {
  Question,
  Megaphone,
  Bell,
  List as HamburgerMenu
} from 'phosphor-react'

import { useDispatch } from 'react-redux'

import { useMediaQuery, useDisclosure } from '@psdhub/common/hooks'
import { MenuList } from '@psdhub/common/components/Menu'
import { Box } from '@psdhub/common/components'

import MenuBar from '~/components/MenuBar'

import EducationalLevelMenu from './components/EducationalLevelMenu/EducationalLevelMenu'
import { SchoolLabel, HeaderButton } from './components'
import './styles'
import { Dropdown } from '../NotificationHistory/components'
import ModalSignOut, { ModalHandler } from '../ModalSignOut/ModalSignOut'
import { RefMenuProps } from '../MenuBar/components/Desktop'

import { notificationsRequest } from '~/store/modules/notifications/actions'

import history from '~/services/history'

import LogoOn from '../LogoOn'
export interface HeaderProps {
  handleGoBack: () => void | Promise<void>
  schoolName?: string
}

const Header: React.FC<HeaderProps> = ({ schoolName, handleGoBack }) => {
  const dispatch = useDispatch()

  const menuRef = useRef<RefMenuProps>(null)

  const { isOpen: isNotificationMenuOpen, onOpen, onClose } = useDisclosure()

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const modalRef = useRef<ModalHandler>(null)

  const openModal = useCallback(() => {
    modalRef.current?.onOpen()
  }, [])

  useEffect(() => {
    dispatch(notificationsRequest())
  }, [dispatch])

  return (
    <Headroom disable={isDesktop} style={{ zIndex: 2 }}>
      <MenuBar menuRef={menuRef} />
      {schoolName && <SchoolLabel schoolName={schoolName} />}
      <Box
        h="14"
        d="flex"
        flexDirection="column"
        background="white"
        justifyContent="center"
        zIndex={99999}
      >
        <Box
          width="100%"
          margin="0 auto"
          maxWidth="1400px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box d="flex" cursor="pointer">
            <HeaderButton
              as={HamburgerMenu}
              onClick={() => menuRef.current?.openMenu()}
            />
            <Box onClick={handleGoBack}>
              <Box as={LogoOn} />
            </Box>
          </Box>
          <Box w="50%" d="flex" justifyContent="flex-end">
            <HeaderButton as={Megaphone} onClick={() => console.log('click')} />
            <HeaderButton as={Question} onClick={() => console.log('click')} />
            <HeaderButton
              isMenu
              as={Bell}
              onClick={onOpen}
              onClose={onClose}
              isOpen={isNotificationMenuOpen}
            >
              <MenuList
                top="2.2rem"
                position="relative"
                padding="0"
                maxW="26rem"
              >
                <Dropdown
                  goToSettings={() => null}
                  markAllAsRead={() => null}
                />
              </MenuList>
            </HeaderButton>
            <HeaderButton children="Sair" onClick={openModal} />
            <ModalSignOut ref={modalRef} />
          </Box>
        </Box>
      </Box>
      <Box w="100%" backgroundColor="white" borderBottom="1px solid #C9C9C9">
        <Box
          d="flex"
          flex="1"
          w="100%"
          m="0 auto"
          alignItems="flex-end"
          maxWidth="1400px"
          backgroundColor="white"
        >
          {history.location.pathname.includes('solucao') ? null : (
            <EducationalLevelMenu />
          )}
        </Box>
      </Box>
    </Headroom>
  )
}

export default Header
