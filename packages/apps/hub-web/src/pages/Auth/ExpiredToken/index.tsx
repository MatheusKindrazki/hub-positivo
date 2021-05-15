import React from 'react'

import { useSelector } from 'react-redux'

import { Button } from '@psdhub/common/components/Form'
import { Box, Text } from '@psdhub/common/components'

import history from '~/services/history'

import GoBack from '~/components/GoBack'

const ExpiredToken: React.FC = () => {
  const { validateViewPin } = useSelector(
    (state: Store.State) => state.forgotPassword
  )

  if (!validateViewPin) history.push('/')

  const handleSubmit = () => {
    history.push('/esqueci-minha-senha')
  }

  const handleLoginRedirect = () => history.push('/login')

  return (
    <Box p="6">
      <GoBack colorScheme="blue" onClick={handleLoginRedirect}>
        O link expirou
      </GoBack>
      <Text fontSize="md" color="gray.500" mb="4">
        Solicite um novo link para redefinir sua senha.
      </Text>

      <Button mt="2" mb="4" onClick={handleSubmit}>
        Solicitar novo link
      </Button>
    </Box>
  )
}

export default ExpiredToken
