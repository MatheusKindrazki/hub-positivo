import React from 'react'

import { Box as BoxChackra, BoxProps as Props } from '@chakra-ui/react'

export interface BoxProps extends Props {
  size?: Props['width']
}

const Box: React.FC<BoxProps> = ({ children, ...rest }) => {
  return <BoxChackra {...rest}>{children}</BoxChackra>
}

export default Box
