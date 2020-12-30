import React from 'react'

import { Avatar as AvatarChakra, AvatarProps } from '@chakra-ui/react'

const Avatar: React.FC<AvatarProps> = ({ ...rest }) => {
  return (
    <AvatarChakra
      width="2.5rem"
      height="2.5rem"
      backgroundColor="gray.400"
      name="HUB"
      {...rest}
    />
  )
}

export default Avatar
export type { AvatarProps }
