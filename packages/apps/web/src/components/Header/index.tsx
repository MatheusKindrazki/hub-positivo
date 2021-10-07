import React, { useCallback, useRef } from 'react'

import Headroom from 'react-headroom'
import { Question, Bell, List as HamburgerMenu } from 'phosphor-react'

import { useTheme } from '@psdhub/common/layout/styles'
import { useMediaQuery } from '@psdhub/common/hooks'
import { MenuList, Menu, MenuButton } from '@psdhub/common/components/Menu'
import { Box } from '@psdhub/common/components'

import history from '~/services/history'

import MenuBar from '~/components/MenuBar'

import EducationalLevelMenu from './components/EducationalLevelMenu/EducationalLevelMenu'
import { SchoolLabel, HeaderButton } from './components'
import './styles'
import { Dropdown } from '../NotificationHistory/components'
import ModalSignOut, { ModalHandler } from '../ModalSignOut/ModalSignOut'
import { RefMenuProps } from '../MenuBar/components/Desktop'
import LogoOn from '../LogoOn'

export interface HeaderProps {
  handleGoBack: () => void | Promise<void>
  schoolName?: string
}

const Header: React.FC<HeaderProps> = ({ schoolName, handleGoBack }) => {
  const menuRef = useRef<RefMenuProps>(null)

  const { colors } = useTheme()
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const modalRef = useRef<ModalHandler>(null)

  const openModal = useCallback(() => {
    modalRef.current?.onOpen()
  }, [])

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
            <Menu placement="bottom-end">
              <MenuButton
                as={Bell}
                fontSize="1.6rem"
                style={{
                  color: colors.blue[500],
                  marginRight: '0.5rem',
                  marginTop: '0.1rem',
                  cursor: 'pointer'
                }}
              />
              <MenuList
                position="relative"
                left="1"
                p="0"
                w={['16rem', '25rem', '25rem', '26rem']}
              >
                <Dropdown markAllAsRead={() => null} />
              </MenuList>
            </Menu>
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
