import React from 'react'

import { Button as BtnChackra, ButtonProps } from '@chakra-ui/react'

interface ButtonParams extends ButtonProps {
  loading?: boolean
}

const Button: React.FC<ButtonParams> = ({ children, ...rest }) => {
  return (
    <BtnChackra
      mt="2rem"
      type="submit"
      color="white"
      fontWeight="bold"
      boxShadow="none!important"
      colorScheme="blue"
      width="100%"
      height="3rem"
      {...rest}
    >
      {children}
    </BtnChackra>
  )
}

export default Button
