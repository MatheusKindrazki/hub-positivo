import React from 'react'

import { Button as ButtonChakra, ButtonProps } from '@chakra-ui/react'

interface ButtonAddRef<T> extends ButtonProps {
  ref?: React.Ref<T>
}

const Button: React.FC<ButtonAddRef<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return <ButtonChakra {...rest}>{children}</ButtonChakra>
}

export default Button

export type { ButtonProps }
