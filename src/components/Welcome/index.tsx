import React from 'react';

import { Avatar, Box, Heading } from '@chakra-ui/core';

const Welcome: React.FC = () => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        width="3.5rem"
        height="3.5rem"
        name="Matheus Kindrazki"
        src="https://avatars2.githubusercontent.com/u/36010251?v=4"
      />
      <Heading
        as="h4"
        ml="4"
        fontSize={['1.4rem', '1.875rem']}
        fontWeight="normal"
        color="black"
      >
        Olá Matheus, seja bem-vindo!
      </Heading>
    </Box>
  );
};

export default Welcome;
