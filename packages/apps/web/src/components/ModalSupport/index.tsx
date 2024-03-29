import React, { useContext } from 'react'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Box, Button, Image, Text } from '@psdhub/common/components'

import ModalContext from './context'
import cerebro from './cerebro.svg'

const ModalSupport: React.FC = () => {
  const context = useContext(ModalContext)

  const { isOpen, onClose, onOpen } = useDisclosure()

  context.onClose = () => onClose()
  context.onOpen = () => onOpen()

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  return (
    <Modal
      title="Estou com uma dúvida"
      isCentered
      autoFocus
      maxW={isDesktop ? '26.5rem' : '20rem'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Box
        d="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDir="column"
      >
        <Image src={cerebro} w={isDesktop ? '18rem' : '10rem'} />
        <Text mt="1rem" fontSize="14px" lineHeight="20px">
          Oi! Montamos um conteúdo supercompleto para sanar possíveis dúvidas.
          São mais de 100 perguntas e respostas com tutoriais de navegação do
          Positivo On. Dê uma olhada:
        </Text>

        <Button
          my="1rem"
          colorScheme="blue"
          w="100%"
          h="48px"
          onClick={() => {
            window.open(
              'https://suporte.positivoon.com.br/portal/pt/home',
              '_blank'
            )
          }}
        >
          ACESSAR FAQ
        </Button>

        <Text mb="1rem" fontSize="14px" lineHeight="20px">
          Caso não encontre a sua dúvida nesse portal, você poderá entrar em
          contato direto com a sua escola.
        </Text>
      </Box>
    </Modal>
  )
}

export default ModalSupport
