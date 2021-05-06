import React, { useContext, useCallback } from 'react'

// import { useDispatch } from 'react-redux'

import { toast } from '@psdhub/common/utils'
import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Box, Button, Stack, Text } from '@psdhub/common/components'

import ModalContext from './context'

const ModalSupport: React.FC = () => {
  // const dispatch = useDispatch()
  const context = useContext(ModalContext)

  const { isOpen, onClose, onOpen } = useDisclosure()

  context.onClose = () => onClose()
  context.onOpen = () => onOpen()

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleDelete = useCallback(() => {
    toast.success('Solução excluída permanentemente')
  }, [])

  return (
    <Box>
      <Modal
        title="Excluir solução permanentemente"
        isCentered
        autoFocus
        maxW={isDesktop ? '26.5rem' : '20rem'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Box>
          <Text>
            Ao excluir uma solução permanentemente, ela nao poderá ser
            recuperada. Deseja realmente prosseguir com a exclusão?
          </Text>
          <Stack
            mt="1.5rem"
            mb="1rem"
            direction={['column', 'row']}
            spacing="0.5rem"
          >
            <Button onClick={onClose} w="100%">
              CANCELAR
            </Button>
            <Button colorScheme="blue" onClick={handleDelete} w="100%">
              EXCLUIR
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

export default ModalSupport
