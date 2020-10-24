import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/core';

import documentTitle from '~/utils/documentTitle';

const Profile: React.FC = () => {
  documentTitle('Selecione o Perfil');

  return (
    <Box p="6">
      <Heading color="black" fontSize="xl" mb="2">
        Entrar
      </Heading>
      <Text fontSize="md" color="gray.500" mb="8">
        Insira seus dados de acesso para começar
      </Text>
    </Box>
  );
};

export default Profile;
