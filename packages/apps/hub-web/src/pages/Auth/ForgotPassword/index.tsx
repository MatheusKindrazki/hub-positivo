import React, { useRef, useCallback } from 'react'

import { Box, Text } from '@hub/common/components'
import {
  Input,
  Form,
  FormProps,
  Button as ButtonForm
} from '@hub/common/components/Form'
import { User } from '@hub/common/components/Icons'
import documentTitle from '@hub/common/utils/documentTitle'

import { useHistory } from 'react-router-dom'

import GoBack from '~/components/GoBack'

const ForgotPassword: React.FC = () => {
  documentTitle('Esqueci minha senha')

  const formRef = useRef<FormProps>(null)
  const history = useHistory()

  const handleGoBack = () => history.goBack()

  const handleSubmit = useCallback(
    async data => {
      return data.userInfo === 'email@teste.com'
        ? history.push('/login')
        : history.push('/forgot-password/failure')
    },
    [history]
  )

  return (
    <Box p="6">
      <GoBack header="Nova senha" colorScheme="blue" onClick={handleGoBack} />
      <Text fontSize="md" color="gray.500" mb="6">
        Insira seu nome de usuário, e-mail ou CPF. Um link para criação de uma
        nova senha será enviado para seu e-mail ou celular cadastrado.
      </Text>
      <Form ref={formRef} onSubmit={handleSubmit} data-testid="submit-form">
        <Input
          name="userInfo"
          type="text"
          placeholder="Usuário, E-mail ou CPF"
          iconLeft={<Box as={User} color="blue.500" />}
        />
        <ButtonForm mt="6">Solicitar Link</ButtonForm>
      </Form>
    </Box>
  )
}

export default ForgotPassword
