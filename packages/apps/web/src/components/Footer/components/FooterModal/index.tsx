import React, { useImperativeHandle } from 'react'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Text, Button } from '@psdhub/common/components'

import { Container } from './styles'

export interface ModalHandler {
  onOpen: () => void
}

interface ModalProps {
  modal: { title: string; content: string }
}

export const FooterModal = React.forwardRef<ModalHandler, ModalProps>(
  ({ modal }, ref) => {
    const { content, title } = modal
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [isDesktop] = useMediaQuery('(min-width: 480px)')

    useImperativeHandle(ref, () => {
      return {
        onOpen
      }
    })

    return (
      <>
        {content && (
          <Modal
            title={title}
            isCentered
            autoFocus
            maxW={isDesktop ? '32rem' : '20rem'}
            isOpen={isOpen}
            onClose={onClose}
          >
            <Container>
              <Text
                mr="1.2rem"
                fontSize="1rem"
                lineHeight="1.25rem"
                textAlign="justify"
              >
                {content}
              </Text>
            </Container>
            <Button
              colorScheme="blue"
              textTransform="uppercase"
              mt="8"
              onClick={onClose}
              float="right"
            >
              Ok
            </Button>
          </Modal>
        )}
      </>
    )
  }
)
