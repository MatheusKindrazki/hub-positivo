import React from 'react'

import { Image as ImageChackra, ImageProps } from '@chakra-ui/react'

const Image: React.FC<ImageProps> = ({ ...rest }) => {
  return <ImageChackra {...rest} />
}

export default Image
