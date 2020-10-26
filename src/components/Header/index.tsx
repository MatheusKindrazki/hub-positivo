import React from 'react';

import { Box, Image, Heading } from '@chakra-ui/core';
import { useMediaQuery } from 'react-responsive';

import logo from '~/assets/logo.png';

import DesktopMenu from './DesktopMenu';

const Header: React.FC = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 480px)' });

  return (
    <Box
      p="4"
      width="100%"
      height="72px"
      background="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #D9D9D9"
    >
      <Box
        className="hub-logo"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src={logo} maxW="40px" alt="hub digital" />
        <Box alignItems="center" justifyContent="center" ml="2">
          <Heading as="h1" color="blue.500" size="md">
            Hub Positivo
          </Heading>
        </Box>
      </Box>

      {isDesktop && <DesktopMenu />}
    </Box>
  );
};

export default Header;
