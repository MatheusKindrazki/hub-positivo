import React from 'react';

import { Box, SimpleGrid, Heading } from '@chakra-ui/core';

import CardProduct from '~/components/CardProduct';
import Welcome from '~/components/Welcome';

import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

const Home: React.FC = () => {
  documentTitle('Home');

  return (
    <>
      <Box
        py="5"
        px="4"
        backgroundColor="blue.500"
        className="background-animate"
      >
        <Box maxW="1400px" px="4" margin="0 auto">
          <Welcome />
        </Box>
      </Box>
      <Box as={Container} p="4" maxW="1400px" margin="0 auto">
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
        >
          <Box mt="8">
            <Heading
              as="h6"
              color="blue.500"
              fontWeight="normal"
              fontSize="1.5rem"
              className="background-animate"
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
    </>
  );
};

export default Home;
