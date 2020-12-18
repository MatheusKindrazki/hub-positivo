import React from 'react'

import { Box, Button, Text } from '@hub/common/components'
import { Button as ButtonForm } from '@hub/common/components/Form'

import { toast } from 'react-toastify'

import GoBack from '~/components/GoBack'

import history from '~/services/history'

const ExpiredToken: React.FC = () => {
  const handleSubmit = () => {
    toast('O link foi enviado para seu <e-mail ou celular>!')
  }

  const handleLoginRedirect = () => history.push('/login')

  return (
    <Box p="6">
      <GoBack colorScheme="blue" onClick={handleLoginRedirect}>
        O link expirou
      </GoBack>
      <Text fontSize="md" color="gray.500" mb="6">
        Solicite um novo link para redefinir sua senha.
      </Text>

      <ButtonForm mt="2" mb="6" onClick={handleSubmit}>
        Solicitar novo link
      </ButtonForm>

      <Box d="flex" justifyContent="center">
        <Button
          onClick={handleLoginRedirect}
          colorScheme="blue"
          variant="link"
          justifyContent="center"
        >
          Voltar para o login
        </Button>
      </Box>
    </Box>
  )
}

export default ExpiredToken
