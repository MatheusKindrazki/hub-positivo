import React from 'react'

import { Text as TextChackra, TextProps } from '@chakra-ui/react'

const Text: React.FC<TextProps> = ({ children }) => {
  return <TextChackra>{children}</TextChackra>
}

export default Text
