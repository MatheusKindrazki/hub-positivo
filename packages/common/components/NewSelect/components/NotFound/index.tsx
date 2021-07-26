import React from 'react'

import { Box, Text } from '@psdhub/common/components'

interface NotFoundProps {
  noOptionsMessage: React.FC
}

const DefaultText: React.FC = () => {
  return <Text>Nada encontrado 😢</Text>
}

const NotFound: React.FC<NotFoundProps> = ({ noOptionsMessage }) => {
  const Component = noOptionsMessage || DefaultText
  return (
    <Box p="4" d="flex" justifyContent="center" alignItems="center">
      <Component />
    </Box>
  )
}

export default NotFound
