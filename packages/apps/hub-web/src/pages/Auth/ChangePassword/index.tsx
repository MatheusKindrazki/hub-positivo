import React, { useRef, useState, useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Text } from '@hub/common/components'
import BarLoader from '@hub/common/components/BarLoader'
import { FormProps, Form, Input, Button } from '@hub/common/components/Form'
import { Eye, EyeSlash, Lock } from '@hub/common/components/Icons'
import { useToast } from '@hub/common/hooks'

import classNames from 'classnames'
import { ValidationError } from 'yup'

import GoBack from '~/components/GoBack'

import useQuery from '~/hooks/useQuery'
import history from '~/services/history'
import { validatePinRequest } from '~/store/modules/forgotPassword/actions'
import { forgotPasswordRequest } from '~/store/modules/user/actions'
import { getValidationErrors } from '~/validators'
import passValidation from '~/validators/auth/createNewPassword'

import { Container } from './styles'

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch()
  const { error } = useToast()
  const search = useQuery()

  const { loading } = useSelector((state: Store.State) => state.forgotPassword)
  const { loading: alterLoading } = useSelector(
    (state: Store.State) => state.user
  )

  const formRef = useRef<FormProps>(null)

  const [view, setView] = useState(false)

  const [token] = useState(() => {
    return search.get('pin') || undefined
  })

  useEffect(() => {
    if (!token) return history.push('/login')

    dispatch(
      validatePinRequest({
        pin: token
      })
    )
  }, [token, dispatch])

  const handleLoginRedirect = () => history.push('/login')

  const handleSubmit = useCallback(
    async data => {
      formRef?.current?.setErrors({})
      try {
        await passValidation.validate(data, {
          abortEarly: false
        })

        dispatch(
          forgotPasswordRequest({
            newPassword: data.password,
            pin: token
          })
        )
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err)

          formRef?.current?.setErrors(errors)

          return
        }

        error('Algo deu errado, Verifique seus dados e tente novamente!')
      }
    },
    [dispatch, error, token]
  )
  return (
    <Container p="6" position="relative" overflow="hidden">
      <BarLoader
        loading={loading}
        css={`
          position: absolute;
          top: 0;
          left: 0;
        `}
        height="5px"
        color="var(--hub-base-color)"
      />
      <GoBack colorScheme="blue" onClick={handleLoginRedirect}>
        Criar Nova Senha
      </GoBack>
      <Text fontSize="md" color="gray.500" mb="8">
        Defina uma nova senha de acesso ao Positivo On
      </Text>

      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        className={classNames({
          disabled: loading
        })}
      >
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

        <Button isLoading={alterLoading}>Salvar nova senha</Button>
      </Form>
    </Container>
  )
}

export default ChangePassword
