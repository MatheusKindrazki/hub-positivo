import React, { useImperativeHandle } from 'react'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import { Button, Text, Box } from '@psdhub/common/components'

import { ModalContainer } from './styles'

export interface ModalHandler {
  onOpen: () => void
}

const ModalSupport = React.forwardRef<ModalHandler>((_, ref) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  useImperativeHandle(ref, () => {
    return {
      onOpen
    }
  })

  const [isDesktop] = useMediaQuery('(min-width: 480px)')
  return (
    <ModalContainer
      title="Atualizações da Versão"
      isCentered
      autoFocus
      maxW={isDesktop ? '26.5rem' : '20rem'}
      isOpen={isOpen}
      onClose={onClose}
      className="modal"
    >
      <Box>
        <Text mb="1.125rem">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          tristique leo in lobortis auctor. In at vestibulum dolor, ut vehicula
          purus. Suspendisse euismod vestibulum ultrices. Vivamus in lobortis
          lorem, vel finibus ex. Nunc consectetur ipsum nec eros consectetur
          vestibulum. Duis nisi sapien, volutpat non ante in, lacinia mattis
          nunc.
        </Text>
        <Button
          h="3rem"
          onClick={onClose}
          w="100%"
          bg="blue.500"
          textTransform="uppercase"
          color="white"
          _hover={{
            background: 'blue.400'
          }}
          _active={{
            background: 'blue.300'
          }}
        >
          Fechar
        </Button>
      </Box>
    </ModalContainer>
  )
})

export default ModalSupport
