import React, { useRef, useState, useCallback } from 'react'

import { toast } from '@psdhub/common/utils'
import { Lock, User, Eye, EyeSlash } from '@psdhub/common/components/Icons'
import {
  Input,
  Button as FormButton,
  Form,
  FormProps
} from '@psdhub/common/components/Form'
import { Box, Text } from '@psdhub/common/components'

import { useAuth } from '../../context/authContext'

const SignIn: React.FC = () => {
  const formRef = useRef<FormProps>(null)

  const { signIn, loading } = useAuth()

  const [view, setView] = useState(false)

  const handleSubmit = useCallback(
    data => {
      try {
        signIn(data)
      } catch (err) {
        toast.error('Algo deu errado, Verifique seus dados e tente novamente!')
      }
    },
    [signIn]
  )

  return (
    <Box p="0">
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
              data-testid="view-button"
              as={view ? Eye : EyeSlash}
              color="gray.500"
              size="19px"
              onClick={() => setView(!view)}
            />
          }
          iconLeft={<Box as={Lock} color="blue.500" size="21px" />}
        />

        <FormButton
          textTransform="uppercase"
          data-testid="submit-button"
          mb="6"
          isLoading={loading}
        >
          Entrar
        </FormButton>
      </Form>
    </Box>
  )
}

export default SignIn
