import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Heading, useTheme } from '@chakra-ui/core';
import { BarLoader } from 'react-spinners';

import Select from '~/components/Select';

import history from '~/services/history';
import { signInSuccess } from '~/store/modules/auth/actions';
import { tempSetProfile } from '~/store/modules/profile/actions';
import { VariantsProps } from '~/styles/profileColors';
import documentTitle from '~/utils/documentTitle';

import CardBox from './components/CardBox';
import profiles from './items';

interface ProfileItem {
  id: string;
  title: string;
  icon: string;
  colorProfile: string;
}

interface SelectItem {
  label: string;
  value: string;
}

const Profile: React.FC = () => {
  documentTitle('Selecione o Perfil');

  const { colors } = useTheme();

  const dispatch = useDispatch();

  const [school, setSchool] = useState<SelectItem>();
  const [loading, setLoading] = useState(false);

  const { selectProfile } = useSelector((state: Store.State) => state.auth);

  const handleSelected = useCallback(data => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSchool(data);
    }, 1500);
  }, []);

  const handleProfileSelect = useCallback(
    (data: ProfileItem) => {
      // !Ação temporária para efeito de visualização de seleção de perfil
      dispatch(
        tempSetProfile({
          name: data.title,
          profile: data.colorProfile as VariantsProps,
        }),
      );

      dispatch(signInSuccess());
    },
    [dispatch],
  );

  useEffect(() => {
    if (!selectProfile) {
      history.push('/');
    }
  }, [selectProfile]);

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
          options={[
            {
              label: 'Escola Positivo Soluções didáticas',
              value: 'teste',
            },
          ]}
        />

        {!loading && school ? (
          <Box mt="3" pt="3">
            {profiles.map(item => (
              <CardBox
                key={item.id}
                icon={item.icon as any}
                id={item.id}
                title={item.title}
                onClick={() => handleProfileSelect(item)}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Profile;
