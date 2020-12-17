import React from 'react'

import { Box, Button, Heading, Text } from '@hub/common/components'
import { Button as ButtonForm } from '@hub/common/components/Form'
import { ArrowLeft } from '@hub/common/components/Icons'

import { toast } from 'react-toastify'

import history from '~/services/history'

const ExpiredToken: React.FC = () => {
  const handleSubmit = () => {
    toast('O link foi enviado para seu <e-mail ou celular>!')
  }

  const handleLoginRedirect = () => history.push('/login')

  return (
    <Box p="6">
      <Box d="flex" alignItems="center" justifyContent="flex-start" mb="2">
        <Button colorScheme="blue" variant="link" justifyContent="flex-start">
          <Box as={ArrowLeft} color="blue.500" size={24} />
        </Button>
        <Heading color="black" fontSize="xl">
          O link expirou
        </Heading>
      </Box>
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
