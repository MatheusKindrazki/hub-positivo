import React from 'react'

import { Button as ButtonChackra, ButtonProps } from '@chakra-ui/react'

interface ButtonAddRef<T> extends ButtonProps {
  ref?: React.Ref<T>
}

const Button: React.FC<ButtonAddRef<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return <ButtonChackra {...rest}>{children}</ButtonChackra>
}

export default Button
