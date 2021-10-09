import React, { useCallback, useRef } from 'react'

import Headroom from 'react-headroom'

import { useMediaQuery } from '@psdhub/common/hooks'
import {
  Question,
  List as HamburgerMenu
} from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import history from '~/services/history'

import MenuBar from '~/components/MenuBar'

import { NotificationProps } from '~/hooks/useNotifications'

import GlobalStyle from './styles'
import NotificationButton from './components/NotificationButton'
import EducationalLevelMenu from './components/EducationalLevelMenu/EducationalLevelMenu'
import { SchoolLabel, HeaderButton } from './components'
import ModalSignOut, { ModalHandler } from '../ModalSignOut/ModalSignOut'
import { RefMenuProps } from '../MenuBar/components/Desktop'
import LogoOn from '../LogoOn'

export interface HeaderProps {
  handleGoBack: () => void | Promise<void>
  schoolName?: string
  notifications: NotificationProps
}

const Header: React.FC<HeaderProps> = ({
  schoolName,
  handleGoBack,
  notifications
}) => {
  const menuRef = useRef<RefMenuProps>(null)
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const modalRef = useRef<ModalHandler>(null)

  const openModal = useCallback(() => {
    modalRef.current?.onOpen()
  }, [])

  console.log(notifications)

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
            <HeaderButton as={Question} onClick={() => console.log('click')} />
            <NotificationButton
              count={notifications.quantityNewNotifications}
            />
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
      <GlobalStyle />
    </Headroom>
  )
}

export default Header
