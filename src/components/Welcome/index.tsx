import React from 'react';

import { Avatar, Box, Heading } from '@chakra-ui/core';

interface WelcomeProps {
  size?: string;
  fontSize?: string;
  option?: 'name' | 'welcome';
  fontWeight?: string;
}

const Welcome: React.FC<WelcomeProps> = ({
  fontSize,
  fontWeight,
  option,
  size,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        width={size || '3.5rem'}
        height={size || '3.5rem'}
        name="Matheus Kindrazki"
        src="https://avatars2.githubusercontent.com/u/36010251?v=4"
      />
      <Heading
        as="h4"
        ml="4"
        fontSize={fontSize || ['1.4rem', '1.875rem']}
        fontWeight={fontWeight || 'normal'}
        color="black"
      >
        {option === 'name' ? (
          <>Matheus Kindrazki</>
        ) : (
          <>Olá Matheus, seja bem-vindo!</>
        )}
      </Heading>
    </Box>
  );
};

export default Welcome;
