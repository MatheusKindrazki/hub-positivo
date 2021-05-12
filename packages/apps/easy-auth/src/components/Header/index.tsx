import React from 'react'

import { Box } from '@psdhub/common/components'

const Header: React.FC = () => {
  return (
    <Box
      pos="absolute"
      top="0"
      left="0"
      zIndex="overlay"
      w="100%"
      h="72px"
      borderBottom="1px solid"
      borderBottomColor="gray.300"
    >
      brasil
    </Box>
  )
}

export default Header
