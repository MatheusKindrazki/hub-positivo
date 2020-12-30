import React from 'react'

import { Image as ImageChakra, ImageProps } from '@chakra-ui/react'

const Image: React.FC<ImageProps> = ({ ...rest }) => {
  return <ImageChakra {...rest} />
}

export default Image

export type { ImageProps }
