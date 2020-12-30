import React from 'react'

import { Flex as FlexChakra, FlexProps } from '@chakra-ui/react'

const Flex: React.FC<FlexProps> = ({ children, ...rest }) => {
  return <FlexChakra {...rest}>{children}</FlexChakra>
}

export default Flex
export type { FlexProps }
