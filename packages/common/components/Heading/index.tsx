import React from 'react'

import { Heading as HeadingChackra, HeadingProps } from '@chakra-ui/react'

const Heading: React.FC<HeadingProps> = ({ children, ...rest }) => {
  return <HeadingChackra {...rest}>{children}</HeadingChackra>
}

export default Heading
