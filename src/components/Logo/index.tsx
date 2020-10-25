import React from 'react';

import { Flex, Heading, Box, Image } from '@chakra-ui/core';

import logo from '~/assets/logo.png';

const Logo: React.FC = () => {
  return (
    <Flex align="center" justify="center" direction={['row', 'column']}>
      <Image src={logo} maxW="80px" alt="hub digital" mb={['12', '4']} />

      <Box alignItems="center" justifyContent="center" mb={['12', '12']}>
        <Heading
          color="blue.500"
          size="xl"
          textAlign={['left', 'center']}
          ml={['4', '0']}
        >
          Hub <br />
          Positivo
        </Heading>
      </Box>
    </Flex>
  );
};

export default Logo;
