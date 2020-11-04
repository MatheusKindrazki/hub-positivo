import React, { useCallback, useImperativeHandle } from 'react';

import { useDispatch } from 'react-redux';

import {
  Box,
  Button,
  MenuDivider,
  useDisclosure,
  Drawer,
  DrawerContent,
} from '@chakra-ui/core';

import Select from '~/components/Select';

import { history } from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';

import Welcome from '../Welcome';

export interface RefMenuProps {
  openMenu: () => void;
}

const MobileMenu = React.forwardRef<RefMenuProps>((_, ref) => {
  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const openMenu = (): void => {
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      openMenu,
    };
  });

  const handleClosed = useCallback(() => {
    dispatch(signOut());

    history.push('/');
  }, [dispatch]);

  return (
    <>
      <Box
        className="hub-logo"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      ></Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent mt={['72px', '72px']} position="relative">
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
            <Button
              variant="ghost"
              width="100%"
              alignItems="center"
              justifyContent="flex-start"
              color="gray.500"
              ml="-10px"
              _hover={{
                color: 'blue.500',
                backgroundColor: 'gray.200',
              }}
              fontSize="0.875rem"
            >
              Início
            </Button>
            <Button
              variant="ghost"
              width="100%"
              alignItems="center"
              justifyContent="flex-start"
              color="gray.500"
              ml="-10px"
              _hover={{
                color: 'blue.500',
                backgroundColor: 'gray.200',
              }}
              fontSize="0.875rem"
            >
              Tutoriais
            </Button>
            <Button
              variant="ghost"
              width="100%"
              alignItems="center"
              justifyContent="flex-start"
              color="gray.500"
              ml="-10px"
              _hover={{
                color: 'blue.500',
                backgroundColor: 'gray.200',
              }}
              fontSize="0.875rem"
            >
              Agenda
            </Button>
          </Box>
          <Box
            px="4"
            py="3"
            position="absolute"
            bottom="80px"
            left="0"
            width="100%"
          >
            <MenuDivider />
            <Button
              onClick={handleClosed}
              variant="link"
              color="gray.500"
              fontSize="0.875rem"
            >
              Sair
            </Button>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default MobileMenu;