import React, { useMemo } from 'react'

import { DotsThreeVertical } from '@psdhub/common/components/Icons'
import { Image, Box, Text, Flex } from '@psdhub/common/components'

import { formatDate } from './utils/formatDate'

export interface NotificationContainerProps {
  solutionName: string
  date: Date
  imageURL: string
  message: string
  read?: boolean
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
    <Flex w="100%" p="2">
      <Box width="95%" d="flex">
        <Image
          bg="blue.500"
          src={imageURL}
          alt=""
          minW="3rem"
          w="3rem"
          h="3rem"
          p="2"
          mt="1"
          borderRadius="0.5rem"
        />
        <Box px="0.5rem" overflow="hidden">
          <Text
            fontSize="1rem"
            fontWeight="700"
            color="#3C3C3C"
            textTransform="capitalize"
          >
            {solutionName}
          </Text>
          <Text lineHeight="20px" noOfLines={5} fontSize="1rem">
            {message}
          </Text>
          <Text color="#6F6F6F" fontSize="0.75rem">
            {formattedDate}
          </Text>
        </Box>
      </Box>
      <Box width="5%">
        <DotsThreeVertical
          size="25"
          color="#969696"
          weight="bold"
          cursor="pointer"
        />
      </Box>
    </Flex>
  )
}

export default NotificationContainer
