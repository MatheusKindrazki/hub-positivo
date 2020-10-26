import React from 'react';

import { Box, Image, Heading, Text, Button } from '@chakra-ui/core';

const CardFeature: React.FC = () => {
  return (
    <Box
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      minH="17.5rem"
      minW={['100%', '100%', '100%']}
      boxShadow="sm"
    >
      <Image
        width={['9.375rem', '9.375rem', '12.5rem']}
        src="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
      />

      <Box
        d="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        as="button"
        p={['2', '2', '4']}
        outline="none"
        boxShadow="none"
      >
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
            Crie tarefas e avaliações para seus alunos com exercícios do ENEM e
            outros vestibulares.
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

export default CardFeature;
