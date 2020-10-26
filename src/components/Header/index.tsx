import React, { useRef } from 'react';

import {
  Box,
  Image,
  Heading,
  Button,
  Avatar,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
} from '@chakra-ui/core';

import Select from '~/components/Select';

import logo from '~/assets/logo.png';

import Welcome from '../Welcome';

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
            backgroundColor="white"
            fontWeight="bold"
            color="blue.500"
            mx="1"
            ref={agendaRef}
          >
            Tutorial
          </Button>
          <Button
            fontSize="0.875rem"
            backgroundColor="white"
            fontWeight="bold"
            mx="1"
            color="blue.500"
            ref={agendaRef}
            onClick={onOpen}
          >
            Agenda
          </Button>

          <Menu closeOnBlur>
            <MenuButton
              as={Button}
              w="2.8125rem"
              background="transparent!important"
            >
              <Avatar
                width="2.5rem"
                height="2.5rem"
                backgroundColor="gray.400"
                name="Matheus Kindrazki"
                src="https://avatars2.githubusercontent.com/u/36010251?v=4"
              />
            </MenuButton>
            <MenuList minW="300px" borderRadius="4px" boxShadow="sm">
              <Box px="4" py="2" w="100%" h="auto">
                <Welcome
                  option="name"
                  fontSize="1.125rem"
                  size="40px"
                  fontWeight="bold"
                />
              </Box>
              <MenuDivider />
              <Box px="4" pt="3" pb="1">
                <Select
                  placeholder="Selecione"
                  className="height-md"
                  defaultValue={{
                    value: 'teste',
                    label: 'Escola Positivo Soluções didáticas',
                  }}
                  options={[
                    {
                      label: 'Escola Positivo Soluções didáticas',
                      value: 'teste',
                    },
                  ]}
                />
              </Box>
              <Box px="4" pb="3">
                <Select
                  placeholder="Selecione"
                  className="height-md"
                  defaultValue={{
                    label: 'Professor',
                    value: 'prof',
                  }}
                  options={[
                    {
                      label: 'Professor',
                      value: 'prof',
                    },
                  ]}
                />
              </Box>
              <MenuDivider />
              <Box px="4" py="3">
                <Button variant="link" color="gray.500" fontSize="0.875rem">
                  Sair
                </Button>
              </Box>
            </MenuList>
          </Menu>
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
