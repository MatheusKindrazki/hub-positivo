import React from 'react'

import { ButtonProps } from '@psdhub/common/components/Button'

import { Container } from './styles'

const ButtonPagination: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Container
      type="button"
      w={[9, 12]}
      h={[9, 12]}
      background="transparent"
      border="1px solid"
      borderColor="gray.500"
      color="blue.500"
      p="0"
      m="0"
      mx="1"
      {...props}
    >
      {children}
    </Container>
  )
}

export default ButtonPagination
