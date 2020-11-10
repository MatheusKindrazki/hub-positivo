import React from 'react';

import { Box } from '@chakra-ui/core';

import Welcome from '~/components/Welcome';

import documentTitle from '~/utils/documentTitle';

import Collapse from './components/Collapse';
import cardsMock from './mock';
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
        <Box maxW="1400px" px={['0', '4']} margin="0 auto">
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
          {cardsMock &&
            cardsMock.map(card => (
              <Collapse cards={card.cards} id={card.id} title={card.title} />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
