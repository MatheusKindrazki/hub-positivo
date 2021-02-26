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

export interface ModalProps extends Omit<Props, 'children'> {
  footerContent?: React.ReactNode
  title: string
  maxW?: string
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  children,
  footerContent,
  title,
  maxW = '26rem',
  className,
  ...rest
}) => {
  return (
    <ModalChakra {...rest}>
      <ModalOverlay />
      <ModalContent maxW={maxW} className={className}>
        <ModalHeader fontWeight="500" fontSize="1.125rem">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </ModalChakra>
  )
}

export default Modal
