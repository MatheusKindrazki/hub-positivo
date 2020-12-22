import React from 'react'

import { Heading as HeadingChakra, HeadingProps } from '@chakra-ui/react'

const Heading: React.FC<HeadingProps> = ({ children, ...rest }) => {
  return <HeadingChakra {...rest}>{children}</HeadingChakra>
}

export default Heading

export type { HeadingProps }
