import React, { useImperativeHandle } from 'react'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import Divider from '@psdhub/common/components/Divider'
import { Box, Button, Text } from '@psdhub/common/components'

export interface ModalHandler {
  onOpen: () => void
}

export const ModalDeleteSolution: React.FC<any> = React.forwardRef(
  (_props, ref) => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [isDesktop] = useMediaQuery('(min-width: 480px)')

    useImperativeHandle(ref, () => {
      return {
        onOpen
      }
    })

    return (
      <>
        <Modal
          title="Excluir solução"
          isCentered
          autoFocus
          maxW={isDesktop ? '26.5rem' : '20rem'}
          isOpen={isOpen}
          onClose={onClose}
        >
          <Divider />
          <Box
            d="flex"
            justifyContent="space-between"
            flexDir="row"
            flexWrap="wrap"
          >
            <Text mt="1.1rem" fontSize="1rem" lineHeight="20px" w="100%">
              Ao excluir uma solução, ela será movida para a lixeira, onde
              poderá ser excluída definitivamente. Deseja realmente mover essa
              solução para a lixeira?
            </Text>

            <Button
              my="1rem"
              colorScheme="gray"
              textColor="blue.500"
              fontWeight="500"
              w="48%"
              h="48px"
              onClick={() => onClose()}
              textTransform="uppercase"
            >
              Cancelar
            </Button>
            <Button
              my="1rem"
              colorScheme="blue"
              fontWeight="500"
              w="48%"
              h="48px"
              textTransform="uppercase"
            >
              Excluir
            </Button>
          </Box>
        </Modal>
      </>
    )
  }
)
