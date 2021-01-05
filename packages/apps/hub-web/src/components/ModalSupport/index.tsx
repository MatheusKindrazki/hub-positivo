import React, { useContext } from 'react'

import { Box, Button, Image, SimpleGrid, Text } from '@hub/common/components'
import { Phone, EnvelopeSimple } from '@hub/common/components/Icons'
import Modal from '@hub/common/components/Modal'
import { useDisclosure, useMediaQuery } from '@hub/common/hooks'

import cerebro from './cerebro.svg'
import ModalContext from './context'

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
        <Text mt=".4rem" fontSize="14px" lineHeight="20px">
          Não encontrou sua dúvida no link acima? Entre em contato com a gente
          para te ajudarmos:
        </Text>

        <SimpleGrid
          templateColumns={isDesktop ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
          spacing={3}
          my="1.1875rem"
        >
          <Box d="flex" justifyContent={isDesktop ? 'inherit' : 'center'}>
            <Box as={Phone} color="blue.500" size={19} mr="5px" />
            <Text fontSize="14px" lineHeight="20px">
              0800 591 1510
            </Text>
          </Box>
          <Box d="flex">
            <Box as={EnvelopeSimple} color="blue.500" size={19} mr="5px" />
            <Text fontSize="14px" lineHeight="20px">
              atendimento@sistemapositivo.com.br
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Modal>
  )
}

export default ModalSupport
