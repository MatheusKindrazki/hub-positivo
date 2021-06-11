import React, { useImperativeHandle } from 'react'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Text, Button, Box } from '@psdhub/common/components'

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
            <Box
              maxH={'20rem'}
              overflowY="scroll"
              css={{
                '&::-webkit-scrollbar': {
                  width: '8px'
                },
                '&::-webkit-scrollbar-track': {
                  width: '10px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgb(60, 60, 60, 0.3)',
                  borderRadius: '8px'
                },
                '&::-webkit-scrollbar-button': {
                  height: 'auto'
                }
              }}
            >
              <Text
                mr="1.2rem"
                fontSize="1rem"
                lineHeight="20px"
                textAlign="justify"
              >
                {content}
              </Text>
            </Box>
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
