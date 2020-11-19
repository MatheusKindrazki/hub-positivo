/* eslint-disable no-console */
import React, { useEffect, useCallback, useState, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { Box, Heading, useTheme } from '@chakra-ui/core';
import { BarLoader } from 'react-spinners';

import Select from '~/components/Select';

import history from '~/services/history';
import documentTitle from '~/utils/documentTitle';

import CardBox from './components/CardBox';
import profiles from './items';

interface SelectItem {
  label: string;
  value: string;
  roles: string[];
}

const Profile: React.FC = () => {
  documentTitle('Selecione o Perfil');

  const { colors } = useTheme();

  const [school, setSchool] = useState<SelectItem>();
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state: Store.State) => state.auth);
  const { user } = useSelector((state: Store.State) => state.user);

  const handleSelected = useCallback(data => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSchool(data);
    }, 1000);
  }, []);

  // const handleProfileSelect = useCallback(
  //   (data: ProfileItem) => {
  //     // !Ação temporária para efeito de visualização de seleção de perfil
  //     dispatch(
  //       tempSetProfile({
  //         name: data.title,
  //         profile: data.colorProfile as VariantsProps,
  //       }),
  //     );
  //   },
  //   [dispatch],
  // );

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  }, [token]);

  const renderSchools = useMemo(() => {
    if (!user?.schools?.length) return [];

    return user?.schools?.map(s => ({
      value: s.id,
      label: s.name,
      roles: s.roles,
    }));
  }, [user]);

  return (
    <>
      <BarLoader
        color={colors.blue[500]}
        width="100%"
        height="5px"
        loading={loading}
        css={`
          border-radius: 8px;
        `}
      />
      <Box p="6">
        <Heading color="black" fontSize="xl" mb="2">
          Selecione sua escola e acesso
        </Heading>
        <Select
          variant="normal"
          placeholder="Selecione"
          onChange={handleSelected}
          options={renderSchools}
        />

        {!loading && school ? (
          <Box mt="3" pt="3">
            {profiles.map(item => (
              <CardBox
                key={item.id}
                icon={item.icon as any}
                id={item.id}
                title={item.title}
                onClick={() => console.log('ola mundo')}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Profile;
