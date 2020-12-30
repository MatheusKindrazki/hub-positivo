import React from 'react'

import { useSelector } from 'react-redux'

import { Box, Text } from '@hub/common/components'
import { Button } from '@hub/common/components/Form'

import GoBack from '~/components/GoBack'

import history from '~/services/history'

const ExpiredToken: React.FC = () => {
  const { validateViewPin } = useSelector(
    (state: Store.State) => state.forgotPassword
  )

  if (!validateViewPin) history.push('/')

  const handleSubmit = () => {
    history.push('/forgot-password')
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
