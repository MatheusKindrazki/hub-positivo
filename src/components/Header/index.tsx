import React, { useRef } from 'react';

import {
  Box,
  Image,
  Heading,
  Button,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/core';

import logo from '~/assets/logo.png';

const Header: React.FC = () => {
  const agendaRef = useRef(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

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

        <Box
          className="hub-logo"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            fontSize="0.875rem"
            backgroundColor="gray.200"
            fontWeight="bold"
            color="blue.500"
            ref={agendaRef}
            onClick={onOpen}
          >
            Agenda
          </Button>
          <Button
            variant="link"
            ml="4"
            fontSize="0.875rem"
            fontWeight="bold"
            color="blue.500"
          >
            Sair
          </Button>
        </Box>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={agendaRef}
      >
        <DrawerContent mt={['0', '72px']}>
          <DrawerCloseButton></DrawerCloseButton>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
