import React, { useMemo } from 'react'

import { DotsThreeVertical } from '@psdhub/common/components/Icons'
import { Image, Box, Text, SimpleGrid } from '@psdhub/common/components'

import { formatDate } from './utils/formatDate'

interface NotificationContainerProps {
  solutionName: string
  date: Date
  imageURL: string
  message: string
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  date,
  solutionName,
  imageURL,
  message
}) => {
  const formattedDate = useMemo(() => {
    return formatDate(date)
  }, [date])

  return (
    <SimpleGrid
      maxW="26rem"
      display="flex"
      p="1rem"
      border="1px solid #6f6f6f9e"
      borderRadius="8px"
    >
      <Box minW="3.1rem" d="flex" justifyContent="center">
        <Image
          bg="blue.500"
          src={imageURL}
          alt=""
          w="3rem"
          h="3rem"
          p="2"
          borderRadius="0.5rem"
        />
      </Box>
      <Box maxW="20rem" px="0.5rem">
        <Text fontSize="1rem" fontWeight="700" color="#3C3C3C">
          {solutionName}
        </Text>
        <Text lineHeight="20px" noOfLines={5} fontSize="1rem">
          {message}
        </Text>
        <Text color="#6F6F6F" fontSize="0.75rem">
          {formattedDate}
        </Text>
      </Box>
      <Box maxW="1rem" textAlign="center">
        <DotsThreeVertical
          size="25"
          color="#969696"
          weight="bold"
          cursor="pointer"
        />
      </Box>
    </SimpleGrid>
  )
}

export default NotificationContainer
