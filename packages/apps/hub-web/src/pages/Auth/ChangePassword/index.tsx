import React, { useRef, useState, useCallback, useEffect } from 'react'

import { Box, Text } from '@hub/common/components'
import { FormProps, Form, Input, Button } from '@hub/common/components/Form'
import { Eye, EyeSlash, Lock } from '@hub/common/components/Icons'
import { useToast } from '@hub/common/hooks'

import { useParams } from 'react-router'
import { ValidationError } from 'yup'

import GoBack from '~/components/GoBack'

import history from '~/services/history'
import { getValidationErrors } from '~/validators'
import passValidation from '~/validators/auth/createNewPassword'

interface ChangePasswordPropsRouter {
  token: string
}

const ChangePassword: React.FC = () => {
  const { error } = useToast()

  const formRef = useRef<FormProps>(null)

  const [view, setView] = useState(false)

  const { token } = useParams<ChangePasswordPropsRouter>()

  useEffect(() => {
    const validToken = true
    if (!validToken) history.push(`/expiredtoken/${token}`)
  }, [token])

  const handleLoginRedirect = () => history.push('/login')

  const handleSubmit = useCallback(async data => {
    formRef?.current?.setErrors({})
    try {
      await passValidation.validate(data, {
        abortEarly: false
      })

      console.log(data)
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = getValidationErrors(err)

        formRef?.current?.setErrors(errors)

        return
      }

      error('Algo deu errado, Verifique seus dados e tente novamente!')
    }
  }, [])

  return (
    <Box p="6">
      <GoBack colorScheme="blue" onClick={handleLoginRedirect}>
        Criar Nova Senha
      </GoBack>
      <Text fontSize="md" color="gray.500" mb="8">
        Defina uma nova senha de acesso ao Positivo On
      </Text>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="password"
          type={!view ? 'password' : 'text'}
          placeholder="Nova senha"
          iconRight={
            <Box
              as={view ? Eye : EyeSlash}
              color="gray.500"
              size="19px"
              onClick={() => setView(!view)}
            />
          }
          iconLeft={<Box as={Lock} color="blue.500" size="21px" />}
          mb="5"
        />
        <Input
          name="confirm-password"
          type={!view ? 'password' : 'text'}
          placeholder="Confirmar nova senha"
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

        <Button>Salvar nova senha</Button>
      </Form>
    </Box>
  )
}

export default ChangePassword
