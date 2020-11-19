/* eslint-disable no-console */
import React, { useEffect, useCallback, useState, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Box, Heading, useTheme } from '@chakra-ui/core';
import { BarLoader } from 'react-spinners';

import Select from '~/components/Select';

import history from '~/services/history';
import { setSigned } from '~/store/modules/auth/actions';
import documentTitle from '~/utils/documentTitle';

import CardBox from './components/CardBox';

interface Role {
  name: string;
}
interface SelectItem {
  label: string;
  value: string;
  roles: Role[];
}

const Profile: React.FC = () => {
  documentTitle('Selecione o Perfil');

  const dispatch = useDispatch();

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

  const handleProfileSelect = useCallback(() => {
    dispatch(setSigned());

    history.push('/');
  }, [dispatch]);

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

  const profiles = useMemo(() => {
    if (!school?.roles.length) return [];

    return school.roles.map(i => ({
      title: i.name,
      icon: 'gestor',
      colorProfile: 'gestor',
    }));
  }, [school]);

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
            {profiles.map((item, i) => (
              <CardBox
                key={i}
                // icon={item.icon as any}
                title={item.title}
                onClick={() => handleProfileSelect()}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Profile;
