import React, { useEffect, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Box, Button, Image, Text } from '@psdhub/common/components'

import turma from './turma.svg'
import GlobalStyles from './styles'

const ModalNoClass: React.FC = () => {
  const dispatch = useDispatch()

  const { withoutAccess, withoutAccessError } = useSelector(
    (state: Store.State) => state.auth
  )

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

  const noClassErrorMessage =
    'Seu perfil não está vinculado a nenhuma turma, por isso seu acesso ao On está bloqueado. Entre em contato com a escola para normalizar essa situação.'

  const noValidClassErrorMessage =
    'Você não está vinculado a uma turma de 2022 e não poderá acessar o On por enquanto. Entre em contato com sua escola.'

  const noClassTitle = 'Nenhuma turma vinculada'

  const noValidClassTitle = 'Houve um problema.'

  return (
    <>
      <Modal
        title={
          withoutAccessError === 'noClass' ? noClassTitle : noValidClassTitle
        }
        isCentered
        autoFocus
        className="modal-nenhuma-turma"
        maxW={isDesktop ? '26.5rem' : '20rem'}
        isOpen={isOpen}
        onClose={() => {}}
      >
        <Box
          d="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDir="column"
        >
          <Image src={turma} w={isDesktop ? '18rem' : '10rem'} />
          <Text mt="1rem" fontSize="0.9375rem" lineHeight="20px">
            {withoutAccessError === 'noClass'
              ? noClassErrorMessage
              : noValidClassErrorMessage}
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
      <GlobalStyles />
    </>
  )
}

export default ModalNoClass
