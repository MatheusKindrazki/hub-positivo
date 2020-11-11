import React, { useCallback, useMemo, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

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
  MenuItem,
} from '@chakra-ui/core';

import Select from '~/components/Select';

import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';
import { loading } from '~/store/modules/global/actions';
import { tempSetProfile } from '~/store/modules/profile/actions';

import Welcome from '../Welcome';
import mock from './mock';

const DesktopMenu: React.FC = () => {
  const dispatch = useDispatch();

  const agendaRef = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [openProfile, setOpenProfile] = useState(false);

  const { name } = useSelector((state: Store.State) => state.profile);
  const { avatar } = useSelector((state: Store.State) => state.auth);

  const handleSelectedProfile = useCallback(
    data => {
      dispatch(loading(true));

      setOpenProfile(false);

      // ?Simula busca na api
      setTimeout(() => {
        dispatch(
          tempSetProfile({
            name: data.label,
            profile: data.colorProfile,
          }),
        );
        dispatch(loading(false));
      }, 2000);
    },
    [dispatch],
  );

  const defaultProfile = useMemo(() => {
    const findProfile = mock.filter(i => i.label === name);

    return findProfile[0];
  }, [name]);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
    history.push('/');
  }, [dispatch]);

  const handleOpenUserOption = useCallback(() => {
    setOpenProfile(!openProfile);
  }, [openProfile]);

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
        <Menu isOpen={openProfile}>
          <MenuButton
            as={Button}
            w="2.8125rem"
            background="transparent!important"
            onClick={handleOpenUserOption}
            style={{ zIndex: 9 }}
          >
            <Avatar
              width="2.5rem"
              height="2.5rem"
              backgroundColor="gray.400"
              name="Matheus Kindrazki"
              src={avatar}
            />
          </MenuButton>
          <MenuList
            style={{ zIndex: 9 }}
            minW="300px"
            borderRadius="4px"
            boxShadow="sm"
            mr="2rem!important"
            top="8px!important"
            onMouseLeave={() => setOpenProfile(false)}
          >
            <MenuItem
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                opacity: 0,
              }}
            ></MenuItem>
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
                variant="normal"
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
                variant="normal"
                placeholder="Selecione"
                className="height-md"
                defaultValue={defaultProfile}
                options={mock}
                onChange={e => handleSelectedProfile(e)}
              />
            </Box>
            <MenuDivider />
            <Box px="4" py="3">
              <Button
                variant="link"
                color="gray.500"
                fontSize="0.875rem"
                onClick={handleSignOut}
              >
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
