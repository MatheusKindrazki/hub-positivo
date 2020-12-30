import React from 'react'

import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps as Props
} from '@chakra-ui/react'

export interface ModalProps extends Props {
  footerContent?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ children, footerContent, ...rest }) => {
  return (
    <ModalChakra {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </ModalChakra>
  )
}

export default Modal
