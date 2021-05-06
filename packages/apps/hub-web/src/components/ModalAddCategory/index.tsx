import React, { useContext, useRef, useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { categoryPostRequest } from '~/store/modules/createCategory/actions'

import { toast } from '@psdhub/common/utils'
import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Input, Form, FormProps } from '@psdhub/common/components/Form'
import { Box, Button, Stack } from '@psdhub/common/components'

import categoryValidator from '~/validators/accessControl/newCategory'
import { getValidationErrors, ValidationError } from '~/validators'

import Container from './styles'
import ModalContext from './context'

const ModalSupport: React.FC = () => {
  const dispatch = useDispatch()
  const formRef = useRef<FormProps>(null)
  const context = useContext(ModalContext)

  const { isOpen, onClose, onOpen } = useDisclosure()

  context.onClose = () => onClose()
  context.onOpen = () => onOpen()

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleAddCategory = useCallback(
    async data => {
      formRef.current?.setErrors({})
      try {
        await categoryValidator.validate(data, { abortEarly: false })
        dispatch(categoryPostRequest(data))
      } catch (e) {
        if (e instanceof ValidationError) {
          const errors = getValidationErrors(e)
          formRef.current?.setErrors(errors)
          return
        }
        toast.error('Algo deu errado, tente novamente!')
      }
    },
    [dispatch]
  )

  return (
    <Container>
      <Modal
        title="Adicionar categoria"
        isCentered
        autoFocus
        maxW={isDesktop ? '26.5rem' : '20rem'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Box d="flex" alignItems="center" flexDir="column">
          <Form ref={formRef} onSubmit={handleAddCategory} width="100%">
            <Input
              label="Título"
              fontSize="14px"
              lineHeight="20px"
              name="nome"
              placeholder="Digite aqui o título da nova categoria"
              type="text"
            />
            <Stack
              mt="1.5rem"
              mb="1rem"
              direction={['column', 'row']}
              spacing="0.5rem"
            >
              <Button onClick={onClose} w="100%">
                CANCELAR
              </Button>
              <Button colorScheme="blue" type="submit" w="100%">
                ADICIONAR
              </Button>
            </Stack>
          </Form>
        </Box>
      </Modal>
    </Container>
  )
}

export default ModalSupport
