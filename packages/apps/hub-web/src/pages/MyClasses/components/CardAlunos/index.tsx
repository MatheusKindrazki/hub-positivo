import React from 'react'

import { Avatar, Text } from '@hub/common/components'

import { Container } from './styles'

const CardAlunos: React.FC = () => {
  return (
    <Container
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      alignItems="center"
      height="4rem"
      minW={['7.25rem', '10.25rem', '10.25rem', '19.25rem']}
      boxShadow="sm"
      p="0.5rem"
      _hover={{
        boxShadow: 'dark-lg'
      }}
      style={{ position: 'relative' }}
    >
      <Avatar
        w="40px"
        h="40px"
        name="Matheus Kindrazki"
        backgroundColor="#B0BEC5"
        fontWeight="normal"
      />
      <Text ml="8px" fontSize="0.875rem">
        Matheus Kindrazki Saldanha
      </Text>
    </Container>
  )
}

export default CardAlunos
