import React from 'react';

import { Box, Image, Heading, Text, Button } from '@chakra-ui/core';

const CardProduct: React.FC = () => {
  return (
    <Box
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      height="8.5rem"
      minW={['10.25rem', '10.25rem', '19.25rem']}
      boxShadow="sm"
    >
      <Image
        width={['4.75rem', '4.5rem', '5.75rem']}
        src="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
      />

      <Box as="button" p={['2', '2', '4']} outline="none" boxShadow="none">
        <Box
          d="flex"
          textAlign="left"
          alignItems="baseline"
          flexDirection="column"
        >
          <Heading as="b" fontWeight="normal" fontSize="1.125rem" color="black">
            Avaliação Studos
          </Heading>
          <Text mt="2" color="gray.500" fontSize="0.875rem">
            Crie tarefas e avaliações para seus alunos
          </Text>

          <Button
            mt="3"
            pointerEvents="none"
            variant="link"
            color="blue.500"
            alignSelf="flex-end"
            fontWeight="bold"
          >
            Acessar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardProduct;
