import React, { useCallback, useRef } from 'react';

import { Box, Image, Heading, Button } from '@chakra-ui/core';
import { List } from 'phosphor-react';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'styled-components';

import logo from '~/assets/logo.png';

import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { RefMenuProps } from './MobileMenu';

interface MenuProps {
  onClick: () => void;
}

const MenuMobile: React.FC<MenuProps> = ({ onClick }) => {
  const { colors } = useTheme();

  return (
    <Button
      onClick={onClick}
      backgroundColor="transparent!important"
      ml="-0.625rem"
      width="auto"
    >
      <List color={colors.blue[500]} size={24} />
    </Button>
  );
};

const Header: React.FC = () => {
  const menuRef = useRef<RefMenuProps>(null);

  const isDesktop = useMediaQuery({ query: '(min-width: 480px)' });

  const handleClick = useCallback(() => {
    menuRef.current?.openMenu();
  }, []);

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
        position={!isDesktop ? 'fixed' : 'relative'}
        zIndex={!isDesktop ? 1 : 'auto'}
      >
        <Box
          className="hub-logo"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {!isDesktop && <MenuMobile onClick={handleClick} />}
          <Image src={logo} maxW="40px" alt="hub digital" />
          <Box alignItems="center" justifyContent="center" ml="2">
            <Heading as="h1" color="blue.500" size="md">
              Hub Positivo
            </Heading>
          </Box>
        </Box>

        {isDesktop && <DesktopMenu />}
        {!isDesktop && <MobileMenu ref={menuRef} />}
      </Box>
      {!isDesktop && <Box height="72px" />}
    </>
  );
};

export default Header;
