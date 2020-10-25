import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Box, Heading } from '@chakra-ui/core';

import Select from '~/components/Select';

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
        Selecione sua escola e acesso
      </Heading>
      <Select />
    </Box>
  );
};

export default Profile;
