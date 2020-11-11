import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { Box } from '@chakra-ui/core';
import { debounce } from 'ts-debounce';

import Welcome from '~/components/Welcome';

import { loading } from '~/store/modules/global/actions';
import { productRequest } from '~/store/modules/products/actions';
import documentTitle from '~/utils/documentTitle';

import Collapse from './components/Collapse';
import SearchInput from './components/Search';
import { Container } from './styles';

const Home: React.FC = () => {
  documentTitle('Home');

  const dispatch = useDispatch();

  const { data: cards } = useSelector((state: Store.State) => state.products);

  const handleSearch = debounce(search => {
    dispatch(loading(true));

    setTimeout(() => {
      dispatch(
        productRequest({
          search,
        }),
      );

      dispatch(loading(false));
    }, 2000);
  }, 550);

  useEffect(() => {
    dispatch(productRequest({}));
  }, [dispatch]);

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
