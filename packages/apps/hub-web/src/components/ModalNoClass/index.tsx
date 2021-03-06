import React, { useEffect, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Box, Button, Image, Text } from '@hub/common/components'
import Modal from '@hub/common/components/Modal'
import { useDisclosure, useMediaQuery } from '@hub/common/hooks'

import { signOut } from '~/store/modules/auth/actions'

import turma from './turma.svg'

const ModalNoClass: React.FC = () => {
  const dispatch = useDispatch()

  const { withoutAccess } = useSelector((state: Store.State) => state.auth)

  const { isOpen, onOpen } = useDisclosure()

  useEffect(() => {
    if (withoutAccess) {
      onOpen()
    }
  }, [onOpen, withoutAccess])

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleSignOut = useCallback(() => {
    dispatch(signOut())
  }, [dispatch])

  return (
    <Modal
      title="Nenhuma turma vinculada"
      isCentered
      autoFocus
      maxW={isDesktop ? '26.5rem' : '20rem'}
      isOpen={isOpen}
      onClose={() => console.log('')}
    >
      <Box
        d="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDir="column"
      >
        <Image src={turma} w={isDesktop ? '18rem' : '10rem'} />
        <Text mt="1rem" fontSize="0.9375rem" lineHeight="20px">
          Este perfil não está vinculado a nenhuma turma, por isso seu acesso ao
          On está bloqueado. Entre em contato com a escola para normalizar essa
          situação.
        </Text>

        <Button
          my="1rem"
          colorScheme="blue"
          w="100%"
          h="48px"
          onClick={handleSignOut}
        >
          SAIR
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalNoClass
