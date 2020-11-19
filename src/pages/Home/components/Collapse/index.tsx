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
  id: string;
  nome: string;
  cor: string;
  solucoes: CardProps[];
}

const Collapse: React.FC<CollapseProps> = ({ id, nome, cor, solucoes }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Box mt="8" key={id} width="100%" className="collapse-home">
        <Box
          width="100%"
          style={{ cursor: 'pointer' }}
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => setShow(!show)}
        >
          <Heading
            as="h6"
            color="blue.500"
            fontWeight="normal"
            fontSize="1.5rem"
            className="background-animate"
          >
            {nome}
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
            {solucoes?.map(item => (
              <CardProduct key={item.id} cor={cor} card={item} />
            ))}
          </SimpleGrid>
        </CollapseUI>
      </Box>
      <CollapseGlobal />
    </>
  );
};

export default Collapse;
