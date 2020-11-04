import React from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@chakra-ui/core';
import { BarLoader } from 'react-spinners';

import Header from '~/components/Header';

import { Container } from './styles';

const Dashboard: React.FC = ({ children }) => {
  const { colors } = useTheme();

  const { loading } = useSelector((state: Store.State) => state.global);

  return (
    <Container>
      <BarLoader
        color={colors.blue[500]}
        width="100vw"
        height="4px"
        loading={loading}
        css={`
          border-radius: 8px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        `}
      />
      <Header />
      {children}
    </Container>
  );
};

export default Dashboard;
