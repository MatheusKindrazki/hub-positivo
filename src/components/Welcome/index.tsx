import React from 'react';

import { useSelector } from 'react-redux';

import { Avatar, Box, Heading, Text } from '@chakra-ui/core';

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
  const { name } = useSelector((state: Store.State) => state.profile);

  return (
    <Box display="flex" alignItems="center">
      <Avatar
        width={size || '3.5rem'}
        height={size || '3.5rem'}
        name="Matheus Kindrazki"
        src="https://avatars2.githubusercontent.com/u/36010251?v=4"
        background="#CFD8DC"
        borderColor="white"
        borderWidth="2px"
      />
      <Heading
        as="h4"
        ml="4"
        fontSize={fontSize || ['1.4rem', '1.875rem']}
        fontWeight={fontWeight || 'normal'}
        color={option === 'name' ? 'black' : 'white'}
      >
        {option === 'name' ? (
          <>Matheus Kindrazki</>
        ) : (
          <>
            Olá Matheus, seja bem-vindo!
            <Text fontSize="1rem" color="blue.100" mt="1">
              {name} em Escola Positivo Soluções Didáticas
            </Text>
          </>
        )}
      </Heading>
    </Box>
  );
};

export default Welcome;
