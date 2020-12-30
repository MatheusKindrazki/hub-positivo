import React from 'react'

import { useSelector } from 'react-redux'

import { Box, Text, Button } from '@hub/common/components'
import documentTitle from '@hub/common/utils/documentTitle'

import { useHistory } from 'react-router-dom'

import GoBack from '~/components/GoBack'

const ForgotPasswordFail: React.FC = () => {
  documentTitle('Esqueci minha senha')

  const { sendViewToken } = useSelector(
    (state: Store.State) => state.forgotPassword
  )

  const history = useHistory()

  if (!sendViewToken) history.push('/login')

  const handleGoBack = () => history.goBack()

  return (
    <Box p="6">
      <GoBack colorScheme="blue" onClick={handleGoBack}>
        O link não pôde ser enviado
      </GoBack>
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
