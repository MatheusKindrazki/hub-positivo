import React, { useCallback, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Image, Heading, Button } from '@chakra-ui/core';
import { ArrowLeft } from 'phosphor-react';
import { List } from 'phosphor-react';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'styled-components';

import image from '~/assets/image.png';

import history from '~/services/history';
import { setFrameURL } from '~/store/modules/products/actions';

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
  const dispatch = useDispatch();
  const menuRef = useRef<RefMenuProps>(null);

  const isDesktop = useMediaQuery({ query: '(min-width: 480px)' });

  const { frameUrl } = useSelector((state: Store.State) => state.products);

  const handleClick = useCallback(() => {
    menuRef.current?.openMenu();
  }, []);

  const handleBack = useCallback(() => {
    dispatch(
      setFrameURL({
        url: '',
      }),
    );

    history.push('/');
  }, [dispatch]);

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
          {!frameUrl && (
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
          )}
          {frameUrl && (
            <Box
              as={ArrowLeft}
              size={8}
              color="blue.500"
              onClick={handleBack}
              cursor="pointer"
            />
          )}
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
  );
};

export default Header;
