import React from 'react';

import { Box } from '@chakra-ui/core';

import Logo from '~/components/Logo';

import { Container } from './styles';

const Auth: React.FC = ({ children }) => {
  return (
    <Container>
      <Logo />
      <Box
        background="white"
        width="100%"
        maxWidth="415px"
        borderWidth="1px"
        rounded="md"
        shadow="md"
        p="5"
      >
        {children}
      </Box>
    </Container>
  );
};

export default Auth;
