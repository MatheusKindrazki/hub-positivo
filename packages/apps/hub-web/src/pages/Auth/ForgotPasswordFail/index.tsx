import React from 'react'

import { Box, Heading, Text, Button } from '@hub/common/components'
import { ArrowLeft } from '@hub/common/components/Icons'
import documentTitle from '@hub/common/utils/documentTitle'

import { useHistory } from 'react-router-dom'

const ForgotPasswordFail: React.FC = () => {
  documentTitle('Esqueci minha senha')

  const history = useHistory()

  return (
    <Box p="6">
      <Box d="flex" alignItems="center" justifyContent="flex-start" mb="2">
        <Button
          colorScheme="blue"
          variant="link"
          justifyContent="flex-start"
          onClick={() => history.push('/login')}
        >
          <Box as={ArrowLeft} color="blue.500" size={24} />
        </Button>
        <Heading color="black" fontSize="2xl" mb="2">
          O link não pôde ser enviado
        </Heading>
      </Box>
      <Box d="flex" flexDir="column">
        <Text fontSize="xl" color="black" mb="6">
          Entre em contato com sua escola para realizar essa requisição
        </Text>
        <Button colorScheme="blue" size="lg">
          Voltar para o login
        </Button>
      </Box>
    </Box>
  )
}

export default ForgotPasswordFail
