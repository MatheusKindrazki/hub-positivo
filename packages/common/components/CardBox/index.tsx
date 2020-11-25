import React from 'react'

import Box, { BoxProps } from '../Box'

const Card: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      background="white"
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
