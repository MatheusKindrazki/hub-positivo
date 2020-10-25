import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Box, Heading, Text } from '@chakra-ui/core';

import history from '~/services/history';
import documentTitle from '~/utils/documentTitle';

const Profile: React.FC = () => {
  documentTitle('Selecione o Perfil');

  const { selectProfile } = useSelector((state: Store.State) => state.auth);

  useEffect(() => {
    if (!selectProfile) {
      history.push('/');
    }
  }, [selectProfile]);

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
