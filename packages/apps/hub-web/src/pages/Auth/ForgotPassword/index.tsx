import React, { useRef, useCallback } from 'react'

import { ValidationError } from 'yup'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'

import { pwdTokenRequest } from '~/store/modules/forgotPassword/actions'

import documentTitle from '@hub/common/utils/documentTitle'
import { User } from '@hub/common/components/Icons'
import {
  Input,
  Form,
  FormProps,
  Button as ButtonForm
} from '@hub/common/components/Form'
import { Box, Text } from '@hub/common/components'

import history from '~/services/history'

import GoBack from '~/components/GoBack'

import userInfo from '~/validators/auth/forgotPassword'
import { getValidationErrors } from '~/validators'

const ForgotPassword: React.FC = () => {
  documentTitle('Esqueci minha senha')

  const { loading } = useSelector((state: Store.State) => state.forgotPassword)

  const { sendViewToken } = useSelector(
    (state: Store.State) => state.forgotPassword
  )

  if (sendViewToken) history.push('/')

  const dispatch = useDispatch()
  const formRef = useRef<FormProps>(null)

  const handleGoBack = () => history.goBack()

  const handleSubmit = useCallback(
    async data => {
      formRef?.current?.setErrors({})
      try {
        await userInfo.validate({ email: data.userInfo }, { abortEarly: false })

        return dispatch(pwdTokenRequest(data))
      } catch (err) {
        if (err instanceof ValidationError) {
          console.log(err)
          const errors = getValidationErrors(err)

          formRef?.current?.setErrors(errors)
        }
        return toast.error(
          'Algo deu errado, Verifique seus dados e tente novamente!'
        )
      }
    },
    [dispatch]
  )

  return (
    <Box p="6">
      <GoBack colorScheme="blue" onClick={handleGoBack} data-testid="go-back">
        Nova senha
      </GoBack>
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
        <ButtonForm mt="6" isLoading={loading} textTransform="uppercase">
          Solicitar Link
        </ButtonForm>
      </Form>
    </Box>
  )
}

export default ForgotPassword
