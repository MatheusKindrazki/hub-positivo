import React from 'react'

import { Link } from 'react-router-dom'

import { Image, Button } from '@psdhub/common/components'

import { Container } from './styles'
import notFoundIcon from './404.svg'

const NotFound: React.FC = () => {
  return (
    <Container>
      <Image src={notFoundIcon} alt="Icon de Página não encontrada" />
      <Button
        as={Link}
        to="/"
        mt="12"
        colorScheme="blue"
        w="100%"
        maxW="250px"
        h="50px"
      >
        Voltar para a home
      </Button>
    </Container>
  )
}

export default NotFound
