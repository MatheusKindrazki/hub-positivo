import React, { useCallback, useRef } from 'react'

import Headroom from 'react-headroom'

import { useMediaQuery, useDisclosure } from '@hub/common/hooks'
import { Box, Modal } from '@hub/common/components'

import Logo from '~/components/LogoOn'

import { HeaderProvider } from './context'
import MobileMenu, { MenuButton } from './components/Mobile'
import { RefMenuProps } from './components/Mobile'
import DesktopMenu from './components/Desktop'
import AlterPass from './components/AlterPass'
const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const menuRef = useRef<RefMenuProps>(null)
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleClick = useCallback(() => {
    menuRef.current?.openMenu()
  }, [])

  return (
    <HeaderProvider>
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
            {!isDesktop && <MenuButton onClick={handleClick} />}
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
    </HeaderProvider>
  )
}

export default Header
