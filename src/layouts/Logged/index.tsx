import React from 'react';

import Header from '~/components/Header';

import { Container } from './styles';

const Dashboard: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Dashboard;
