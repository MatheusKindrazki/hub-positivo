import React from 'react'

import Box, { BoxProps } from '@psdhub/common/components/Box'

const Control: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      w="100%"
      mt="0.5rem"
      pos="absolute"
      rounded="md"
      borderWidth="1px"
      borderColor="gray.400"
      boxShadow="md"
      bg="white"
      p="5"
      {...rest}
    >
      {children}
    </Box>
  )
}

export default Control
