import React from 'react'

import { BoxProps } from '@psdhub/common/components/Box'
import { Image, Box, Text } from '@psdhub/common/components'
export interface SimpleCardProps extends BoxProps {
  imageSrc: string
  title: string
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  imageSrc,
  title,
  onClick,
  ...props
}) => {
  return (
    <Box d="flex" alignItems="center" m="0.5rem" onClick={onClick} {...props}>
      <Image
        src={imageSrc}
        background="blue.500"
        w="3rem"
        h="3rem"
        borderRadius="0.5rem"
        p="1"
      />
      <Text ml="1rem">{title}</Text>
    </Box>
  )
}

export default SimpleCard
