import React, { useCallback, useRef } from 'react'

import Headroom from 'react-headroom'

import { useTheme } from '@hub/common/layout'
import { useMediaQuery, useDisclosure } from '@hub/common/hooks'
import { List } from '@hub/common/components/Icons'
import { Box, Button, Modal } from '@hub/common/components'

import Logo from '~/components/LogoOn'

import MobileMenu from './MobileMenu'
import { RefMenuProps } from './MobileMenu'
import DesktopMenu from './DesktopMenu'
import AlterPass from './components/AlterPass'

interface MenuProps {
  onClick: () => void
}

const MenuMobile: React.FC<MenuProps> = ({ onClick }) => {
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

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const menuRef = useRef<RefMenuProps>(null)
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleClick = useCallback(() => {
    menuRef.current?.openMenu()
  }, [])

  return (
    <>
      <Headroom disable={isDesktop} style={{ zIndex: 2 }}>
        <Box
          p="4"
          width="100%"
          height="72px"
          background="white"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid #D9D9D9"
          zIndex={99999}
        >
          <Box
            className="hub-logo"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {!isDesktop && <MenuMobile onClick={handleClick} />}
            <Logo />
          </Box>

          {isDesktop ? (
            <DesktopMenu />
          ) : (
            <MobileMenu
              openModalPass={() => {
                menuRef.current?.openMenu()
                onOpen()
              }}
              ref={menuRef}
            />
          )}
        </Box>
      </Headroom>
      <Modal
        title="Alterar senha"
        isOpen={isOpen}
        maxW={isDesktop ? '26rem' : '20rem'}
        onClose={onClose}
        isCentered
        autoFocus
      >
        <AlterPass onClose={onClose} />
      </Modal>
    </>
  )
}

export default Header
