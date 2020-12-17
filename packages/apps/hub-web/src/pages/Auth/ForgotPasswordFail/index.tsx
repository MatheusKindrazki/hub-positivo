import React from 'react'

import { Box, Text, Button } from '@hub/common/components'
import documentTitle from '@hub/common/utils/documentTitle'

import { useHistory } from 'react-router-dom'

import GoBack from '~/components/GoBack'

const ForgotPasswordFail: React.FC = () => {
  documentTitle('Esqueci minha senha')

  const history = useHistory()

  const handleGoBack = () => history.goBack()

  return (
    <Box p="6">
      <GoBack
        header="O link não pôde ser enviado"
        colorScheme="blue"
        onClick={handleGoBack}
      />
      <Box d="flex" flexDir="column">
        <Text fontSize="md" color="gray.500" mb="6">
          Entre em contato com sua escola para realizar essa requisição
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => history.push('/login')}
        >
          Voltar para o login
        </Button>
      </Box>
    </Box>
  )
}

export default ForgotPasswordFail
