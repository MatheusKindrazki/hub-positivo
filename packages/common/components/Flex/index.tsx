import React from 'react'

import { Flex as FlexChackra, FlexProps } from '@chakra-ui/react'

const Flex: React.FC<FlexProps> = ({ children, ...rest }) => {
  return <FlexChackra {...rest}>{children}</FlexChackra>
}

export default Flex
