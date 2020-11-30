import React from 'react'

import { Avatar as AvatarChackra, AvatarProps } from '@chakra-ui/react'

const Avatar: React.FC<AvatarProps> = ({ ...rest }) => {
  return (
    <AvatarChackra
      width="2.5rem"
      height="2.5rem"
      backgroundColor="gray.400"
      name="HUB"
      {...rest}
    />
  )
}

export default Avatar
