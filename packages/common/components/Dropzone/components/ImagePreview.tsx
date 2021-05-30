import React from 'react'

import { Box, Image } from '@psdhub/common/components'

import { ImageSquare } from '../../Icons'

interface ImagePreviewProps {
  src?: string
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => {
  return !src ? (
    <Box
      as={ImageSquare}
      color="white"
      size="3rem"
      alignSelf="center"
      justifySelf="center"
    />
  ) : (
    <Image w="60%" color="white" src={src as string} />
  )
}

export default ImagePreview
