import React from 'react'

import { Box, Text } from '@psdhub/common/components'

interface NotFoundProps {
  text?: React.ReactNode
}

const NotFound: React.FC<NotFoundProps> = ({ text = 'Nada encontrado' }) => {
  return (
    <Box
      className="not-found"
      w="100%"
      d="flex"
      justifyContent="center"
      alignItems="center"
      color="gray.500"
    >
      <Text>{text}</Text>
    </Box>
  )
}

export default NotFound
