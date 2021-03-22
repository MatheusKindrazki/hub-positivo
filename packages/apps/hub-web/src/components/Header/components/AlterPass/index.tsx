import React, { useCallback, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { alterPasswordRequest } from '~/store/modules/user/actions'

import { toast } from '@hub/common/utils'
import { Eye, EyeSlash } from '@hub/common/components/Icons'
import { Form, FormProps, Input } from '@hub/common/components/Form'
import { Box, Button, SimpleGrid } from '@hub/common/components'

import alterPassword from '~/validators/user/alterPassword'
import { getValidationErrors, ValidationError } from '~/validators'

interface AlterPassProps {
  onClose: () => void
}

const AlterPass: React.FC<AlterPassProps> = ({ onClose }) => {
  const dispatch = useDispatch()

  const { loading } = useSelector((state: Store.State) => state.user)

  const [viewPass, setViewPass] = useState(false)
  const [viewNewPass, setViewNewPass] = useState(false)

  const formRef = useRef<FormProps>(null)

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({})

      try {
        await alterPassword.validate(data, {
          abortEarly: false
        })

        dispatch(alterPasswordRequest(data))
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
    <Box>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          mb="1rem"
          name="oldPassword"
          type={viewPass ? 'text' : 'password'}
          iconRight={
            <Box
              data-testid="view-pass"
              cursor="pointer"
              as={viewPass ? Eye : EyeSlash}
              color="gray.500"
              size="19px"
              onClick={() => setViewPass(!viewPass)}
            />
          }
          placeholder="Senha Atual"
        />
        <Input
          mb="1rem"
          name="newPassword"
          type={viewNewPass ? 'text' : 'password'}
          iconRight={
            <Box
              data-testid="view-new-password"
              cursor="pointer"
              as={viewNewPass ? Eye : EyeSlash}
              color="gray.500"
              size="19px"
              onClick={() => setViewNewPass(!viewNewPass)}
            />
          }
          placeholder="Nova Senha"
        />
        <Input
          name="confirmNewPassword"
          type={viewNewPass ? 'text' : 'password'}
          iconRight={
            <Box
              data-testid="view-new-password"
              cursor="pointer"
              as={viewNewPass ? Eye : EyeSlash}
              color="gray.500"
              size="19px"
              onClick={() => setViewNewPass(!viewNewPass)}
            />
          }
          placeholder="Confirmar nova senha"
          mb="2rem"
        />
        <SimpleGrid templateColumns="repeat(2, 1fr)" spacing={3} mb="1rem">
          <Button
            type="button"
            colorScheme="blue"
            backgroundColor="gray.50"
            variant="ghost"
            onClick={onClose}
          >
            CANCELAR
          </Button>
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            ALTERAR
          </Button>
        </SimpleGrid>
      </Form>
    </Box>
  )
}

export default AlterPass
