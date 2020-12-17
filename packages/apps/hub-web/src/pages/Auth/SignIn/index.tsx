import React, { useRef, useState, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Heading, Text, Button } from '@hub/common/components'
import {
  Input,
  Button as FormButton,
  Form,
  FormProps
} from '@hub/common/components/Form'
import { Lock, User, Eye, EyeSlash } from '@hub/common/components/Icons'
import documentTitle from '@hub/common/utils/documentTitle'

import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { signInRequest } from '~/store/modules/auth/actions'
import { ValidationError, getValidationErrors } from '~/validators'
import signInValidator from '~/validators/auth/signIn'

const SignIn: React.FC = () => {
  documentTitle('Entrar')

  const dispatch = useDispatch()
  const [view, setView] = useState(false)

  const { loading } = useSelector((state: Store.State) => state.auth)

  const formRef = useRef<FormProps>(null)

  const history = useHistory()

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({})

      try {
        await signInValidator.validate(data, {
          abortEarly: true
        })

        dispatch(signInRequest(data))
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err)

          formRef?.current?.setErrors(errors)

          return
        }

        toast.error('Algo deu errado, Verifique seus dados e tente novamente!')
      }
    },
    [dispatch]
  )

  return (
    <Box p="6">
      <Heading color="black" fontSize="xl" mb="2">
        Entrar
      </Heading>
      <Text fontSize="md" color="gray.500" mb="8">
        Insira seus dados de acesso para começar
      </Text>

      <Form ref={formRef} onSubmit={handleSubmit} data-testid="submit-form">
        <Input
          name="username"
          type="text"
          data-testid="email"
          placeholder="Digite seu usuário"
          iconLeft={<Box as={User} color="blue.500" size="18px" />}
          mb="5"
        />
        <Input
          name="password"
          type={!view ? 'password' : 'text'}
          placeholder="Digite sua senha"
          autoComplete="current-password"
          data-testid="password"
          iconRight={
            <Box
              as={view ? Eye : EyeSlash}
              color="gray.500"
              size="19px"
              onClick={() => setView(!view)}
            />
          }
          iconLeft={<Box as={Lock} color="blue.500" size="21px" />}
        />

        <FormButton data-testid="submit-button" isLoading={loading} mb="6">
          Entrar
        </FormButton>
      </Form>
      <Button
        variant="link"
        colorScheme="blue"
        size="lg"
        width="100%"
        mb="2"
        onClick={() => history.push('/forgot-password')}
      >
        Esqueci minha senha
      </Button>
    </Box>
  )
}

export default SignIn
