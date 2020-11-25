import React, { useCallback, useRef } from 'react'

import { Box, Image, Heading, Button } from '@hub/common/components'
import { List } from '@hub/common/components/Icons'
import { useMediaQuery, useTheme } from '@hub/common/layout'

import image from '~/assets/image.png'

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

  return (
    <>
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
          <Box
            backgroundColor="blue.500"
            className="background-animate"
            w="40px"
            h="40px"
            d="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={image} h="24px" alt="hub digital" />
          </Box>
          <Box alignItems="center" justifyContent="center" ml="2">
            <Heading
              as="h1"
              color="blue.500"
              size="md"
              className="background-animate"
            >
              Hub Positivo
            </Heading>
          </Box>
        </Box>

        {isDesktop && <DesktopMenu />}
        {!isDesktop && <MobileMenu ref={menuRef} />}
      </Box>
      {!isDesktop && <Box height="72px" />}
    </>
  )
}

export default Header
