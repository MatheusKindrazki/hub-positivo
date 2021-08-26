import React from 'react'

import { Box, Text, Image } from '@psdhub/common/components'

interface LinkButtonProps {
  image: string
  title: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ image, title, children }) => {
  return (
    <Box
      className="link"
      d="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      mb="4"
    >
      <Box
        className="link-icon"
        w="48px"
        h="48px"
        bg="blue.500"
        borderRadius="8px"
        d={['none', 'none', 'flex']}
        mr="3"
        p="1"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={image} alt={title} />
      </Box>
      <Box flex="1">
        <Text fontWeight="600" fontSize="1.25rem">
          {title}
        </Text>
        <Text>{children}</Text>
      </Box>
    </Box>
  )
}

export default LinkButton
