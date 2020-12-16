import React, { useRef, useCallback } from 'react'

import { Box, Heading, Text, Button } from '@hub/common/components'
import {
  Input,
  Form,
  FormProps,
  Button as ButtonForm
} from '@hub/common/components/Form'
import { ArrowLeft, User } from '@hub/common/components/Icons'
import documentTitle from '@hub/common/utils/documentTitle'

import { useHistory } from 'react-router-dom'

const ForgotPassword: React.FC = () => {
  documentTitle('Esqueci minha senha')

  const formRef = useRef<FormProps>(null)
  const history = useHistory()

  const handleSubmit = useCallback(
    async data => {
      console.log(data)
      return data.userInfo === 'email@teste.com'
        ? history.push('/login')
        : history.push('/forgot-password-failure')
    },
    [history]
  )

  return (
    <Box p="6">
      <Box d="flex" alignItems="center" justifyContent="flex-start" mb="2">
        <Button
          colorScheme="blue"
          variant="link"
          justifyContent="flex-start"
          onClick={() => history.goBack()}
        >
          <Box as={ArrowLeft} color="blue.500" size={24} />
        </Button>
        <Heading color="black" fontSize="2xl" mb="2">
          Nova senha
        </Heading>
      </Box>
      <Text fontSize="xl" color="black" mb="3">
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
