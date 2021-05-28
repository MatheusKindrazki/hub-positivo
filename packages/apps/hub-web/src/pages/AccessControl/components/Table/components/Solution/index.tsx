import React from 'react'

import { Stack, Image, Text } from '@psdhub/common/components'

import { lookingForIcon } from '~/assets'

interface SolutionProps {
  solution: string
  file: string
  activated?: boolean
}
const Solution: React.FC<SolutionProps> = ({ solution, file }) => {
  return (
    <Stack alignItems="center" direction="row" spacing="1">
      <Image
        src={file}
        fallbackSrc={lookingForIcon}
        w="40px"
        h="40px"
        background="blue.500"
        borderRadius="md"
        padding="2"
      />

      <Text maxW="75%" alignContent="center" noOfLines={1}>
        {solution}
      </Text>
    </Stack>
  )
}

export default Solution
