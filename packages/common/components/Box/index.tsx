import React from 'react'

import { Box as BoxChakra, BoxProps as Props } from '@chakra-ui/react'

export interface BoxProps extends Props {
  size?: Props['width']
}

const Box: React.FC<BoxProps> = ({ children, ...rest }) => {
  return <BoxChakra {...rest}>{children}</BoxChakra>
}

export default Box
