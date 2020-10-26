import React from 'react';

import { Box, SimpleGrid, Heading } from '@chakra-ui/core';

import CardProduct from '~/components/CardProduct';
import Welcome from '~/components/Welcome';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Box as={Container} p="4" maxW="1400px" margin="0 auto">
      <Box
        mt="6"
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
      >
        <Welcome />

        <Box mt="8">
          <Heading
            as="h6"
            color="blue.500"
            fontWeight="normal"
            fontSize="1.5rem"
          >
            Produtos
          </Heading>
          <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={4} mt="4">
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
