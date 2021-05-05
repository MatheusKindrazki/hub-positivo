import React from 'react'

import { Avatar, Text } from '@psdhub/common/components'

import { Container } from './styles'

interface CardAlunoProps {
  ativo: boolean
  idUsuarioUnico: string
  nome: string
}

const CardAlunos: React.FC<CardAlunoProps> = ({ nome }) => {
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
        name={nome}
        backgroundColor="#B0BEC5"
        color="black"
        fontWeight="normal"
      />
      <Text ml="8px" fontSize="0.875rem" className="card-title">
        {nome.toLowerCase()}
      </Text>
    </Container>
  )
}

export default CardAlunos
