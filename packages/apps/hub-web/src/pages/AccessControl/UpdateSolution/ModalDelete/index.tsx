import React, { useImperativeHandle, useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { solutionDeleteRequest } from '~/store/modules/solutions/actions'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import Divider from '@psdhub/common/components/Divider'
import { Box, Button, Text } from '@psdhub/common/components'

export interface ModalHandler {
  onOpen: () => void
}

interface ModalProps {
  solutionId: string | undefined
}

export const ModalDeleteSolution = React.forwardRef<ModalHandler, ModalProps>(
  ({ solutionId }, ref) => {
    const dispatch = useDispatch()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [isDesktop] = useMediaQuery('(min-width: 480px)')

    const deleteSolution = useCallback(() => {
      if (solutionId) {
        console.log(solutionId)
        dispatch(solutionDeleteRequest(solutionId))
      }
    }, [dispatch, solutionId])

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
              onClick={deleteSolution}
            >
              Excluir
            </Button>
          </Box>
        </Modal>
      </>
    )
  }
)
