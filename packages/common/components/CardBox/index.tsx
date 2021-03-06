import React from 'react'

import Box, { BoxProps } from '../Box'

const Card: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      background="var(--hub-box-color)"
      width="100%"
      minWidth="200px"
      borderWidth="1px"
      rounded="md"
      shadow="md"
      {...rest}
    >
      {children}
    </Box>
  )
}

export default Card

export type CardProps = BoxProps
