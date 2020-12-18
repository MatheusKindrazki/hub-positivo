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
import { toast } from 'react-toastify'
import { ValidationError } from 'yup'

import GoBack from '~/components/GoBack'

import { getValidationErrors } from '~/validators'
import email from '~/validators/auth/forgotPassword'

const ForgotPassword: React.FC = () => {
  documentTitle('Esqueci minha senha')

  const formRef = useRef<FormProps>(null)
  const history = useHistory()

  const handleGoBack = () => history.goBack()

  const handleSubmit = useCallback(async data => {
    formRef?.current?.setErrors({})
    try {
      await email.validate({ email: data.userInfo }, { abortEarly: false })

      return console.log(data)
    } catch (err) {
      if (err instanceof ValidationError) {
        console.log(err)
        const errors = getValidationErrors(err)

        formRef?.current?.setErrors(errors)

        return toast.error(
          'Algo deu errado, Verifique seus dados e tente novamente!'
        )
      }
    }
  }, [])

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
