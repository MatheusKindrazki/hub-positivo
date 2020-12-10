import React, { useCallback, useMemo, useRef } from 'react'

import { Box, Button } from '@hub/common/components'
import { List } from '@hub/common/components/Icons'
import { useTheme } from '@hub/common/layout'

import { useMediaQuery } from '@chakra-ui/react'
import Headroom from 'react-headroom'

import Logo from '~/components/LogoOn'

import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import { RefMenuProps } from './MobileMenu'

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
  const menuRef = useRef<RefMenuProps>(null)
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleClick = useCallback(() => {
    menuRef.current?.openMenu()
  }, [])

  const CustomHeader = useMemo(() => {
    return isDesktop ? React.Fragment : Headroom
  }, [isDesktop])

  return (
    <CustomHeader>
      <Box
        p="4"
        width="100%"
        height="72px"
        background="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #D9D9D9"
        position={!isDesktop ? 'fixed' : 'inherit'}
        zIndex={!isDesktop ? 999 : 'auto'}
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

        {isDesktop && <DesktopMenu />}
        {!isDesktop && <MobileMenu ref={menuRef} />}
      </Box>
      {!isDesktop && <Box height="72px" />}
    </CustomHeader>
  )
}

export default Header
