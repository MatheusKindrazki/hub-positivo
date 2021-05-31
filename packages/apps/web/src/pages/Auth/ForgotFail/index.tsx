import React from 'react'

import { useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'

import documentTitle from '@psdhub/common/utils/documentTitle'
import { Box, Text, Button } from '@psdhub/common/components'

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
          onClick={() => setTimeout(() => history.push('/login'), 500)}
        >
          Voltar para o login
        </Button>
      </Box>
    </Box>
  )
}

export default ForgotPasswordFail
