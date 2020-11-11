import React, { useCallback, useState } from 'react';

import { Box } from '@chakra-ui/core';
import _ from 'lodash';

import Welcome from '~/components/Welcome';

import documentTitle from '~/utils/documentTitle';

import Collapse from './components/Collapse';
import SearchInput from './components/Search';
import cardsMock from './mock';
import { Container } from './styles';

const Home: React.FC = () => {
  documentTitle('Home');

  const [cards, setCards] = useState(cardsMock);

  const handleSearch = useCallback(search => {
    if (!search) {
      setCards(cardsMock);
      return;
    }

    type Brasil = typeof cardsMock;

    const newcards = [] as Brasil;

    cardsMock.forEach(i => {
      i.cards.forEach(card => {
        if (card.title.toLowerCase().includes(search.toLowerCase())) {
          if (!newcards.length) {
            newcards.push({
              id: i.id,
              title: i.title,
              cards: [card],
            });
          } else {
            const index = newcards.findIndex(newCard => newCard.id === i.id);

            const cardsNew = newcards[index]?.cards || [];

            newcards[index] = {
              id: i.id,
              title: i.title,
              cards: [...cardsNew, card],
            };
          }
        }
      });
    });

    setCards((newcards as unknown) as Brasil);
  }, []);

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
        <SearchInput onChange={handleSearch} />
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
        >
          {cards &&
            cards.map(card => (
              <Collapse
                key={card.id}
                cards={card.cards}
                id={card.id}
                title={card.title}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
