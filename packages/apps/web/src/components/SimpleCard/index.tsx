import React from 'react'

import { Image, Box, Text } from '@psdhub/common/components'

export interface SimpleCardProps {
  imageSrc: string
  title: string
}

const SimpleCard: React.FC<SimpleCardProps> = ({ imageSrc, title }) => {
  return (
    <Box d="flex" w="100%" alignItems="center" mt="0.5rem">
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
