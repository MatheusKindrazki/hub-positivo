import React, { useState } from 'react';

import {
  Collapse as CollapseUI,
  Box,
  Heading,
  SimpleGrid,
} from '@chakra-ui/core';
import { CaretDown } from 'phosphor-react';

import CardProduct, { CardProps } from '~/components/CardProduct';

import CollapseGlobal from './styles';

interface CollapseProps {
  id: number;
  title: string;
  cards: CardProps[];
}

const Collapse: React.FC<CollapseProps> = ({ id, title, cards }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Box
        mt="8"
        key={id}
        width="100%"
        className="collapse-home"
        onClick={() => setShow(!show)}
        style={{ cursor: 'pointer' }}
      >
        <Box
          width="100%"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            as="h6"
            color="blue.500"
            fontWeight="normal"
            fontSize="1.5rem"
            className="background-animate"
          >
            {title}
          </Heading>

          <Box
            as={CaretDown}
            color="blue.500"
            size={6}
            style={{
              transition: 'all .2s linear',
              transform: show ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
          />
        </Box>
        <CollapseUI isOpen={show}>
          <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={4} mt="4">
            {cards?.map(item => (
              <CardProduct key={item.id} card={item} />
            ))}
          </SimpleGrid>
        </CollapseUI>
      </Box>
      <CollapseGlobal />
    </>
  );
};

export default Collapse;