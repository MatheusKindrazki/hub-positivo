import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { Box, Heading } from '@chakra-ui/core';
import { debounce } from 'ts-debounce';

import Select from '~/components/Select';
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

  const { data: cards, loading: load } = useSelector(
    (state: Store.State) => state.products,
  );

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
        <Box
          maxW="1400px"
          px={['0', '4']}
          margin="0 auto"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Welcome />

          <Box
            w="100%"
            maxW={['100%', '100%', '100%', '308px']}
            mt={['5', '5', '5', '0']}
          >
            <Select
              variant="blue-transparent"
              defaultValue={{
                label: '123',
                value: 'asd',
              }}
              options={[
                {
                  label: '123',
                  value: 'asd',
                },
                {
                  label: 'aaa111',
                  value: 'ola mundo',
                },
              ]}
            />
          </Box>
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

        {!cards?.length && !load ? (
          <Box mt="5">
            <Heading as="h5" fontSize="1.5rem" color="blue.500">
              Nenhum produto encontrado!
            </Heading>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Home;
