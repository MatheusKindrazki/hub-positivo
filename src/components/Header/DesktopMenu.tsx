import React, { useRef } from 'react';

import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/core';

import Select from '~/components/Select';

import Welcome from '../Welcome';

const DesktopMenu: React.FC = () => {
  const agendaRef = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
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
        <Menu>
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

export default DesktopMenu;
