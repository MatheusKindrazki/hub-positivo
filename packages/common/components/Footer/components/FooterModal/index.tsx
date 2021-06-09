import React, { useImperativeHandle } from 'react'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import Divider from '@psdhub/common/components/Divider'
import { Text } from '@psdhub/common/components'

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
            maxW={isDesktop ? '26.5rem' : '20rem'}
            isOpen={isOpen}
            onClose={onClose}
          >
            <Divider />

            <Text mt="1.1rem" fontSize="1rem" lineHeight="20px" w="100%">
              {content}
            </Text>
          </Modal>
        )}
      </>
    )
  }
)
