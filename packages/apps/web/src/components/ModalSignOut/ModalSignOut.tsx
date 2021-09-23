import React, { useCallback, useImperativeHandle } from 'react'

import { useDispatch } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Box, Button, Text } from '@psdhub/common/components'

export interface ModalHandler {
  onOpen: () => void
}

const ModalSignOut = React.forwardRef<ModalHandler>((_, ref) => {
  const dispatch = useDispatch()

  const { isOpen, onClose, onOpen } = useDisclosure()
  useImperativeHandle(ref, () => {
    return {
      onOpen
    }
  })

  const leaveOn = useCallback(() => {
    dispatch(signOut())
  }, [dispatch])

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const modalTitle = 'Sair do On?'

  const modalDescription =
    'Deseja realmente sair do On? Você poderá entrar novamente a qualquer momento.'

  return (
    <Box>
      <Modal
        title={modalTitle}
        autoFocus
        maxW={isDesktop ? '26.5rem' : '20rem'}
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc
      >
        <Text color="grey.600">{modalDescription}</Text>

        <Box mt="6" d="flex" alignItems="center" justifyContent="center">
          <Button
            h="12"
            w="50%"
            mx="1"
            onClick={onClose}
            variant="solid"
            backgroundColor="blue.500"
            color="white"
          >
            CANCELAR
          </Button>
          <Button
            h="12"
            w="50%"
            mx="1"
            onClick={leaveOn}
            variant="outline"
            borderColor="blue.500"
            color="blue.500"
          >
            SAIR
          </Button>
        </Box>
      </Modal>
    </Box>
  )
})

export default ModalSignOut
