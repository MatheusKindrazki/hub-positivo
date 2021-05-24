import React from 'react'

import { Flex, Box, Image } from '@psdhub/common/components'
interface SolutionProps {
  solution: string
  file: string
  activated: boolean
}

const Solution: React.FC<SolutionProps> = ({ solution, file, activated }) => {
  return (
    <Flex alignItems="center" opacity={activated ? '1' : '0.5'}>
      {file ? (
        <Image
          src={file}
          w="40px"
          h="40px"
          background="blue.500"
          borderRadius="md"
          padding="2"
        />
      ) : (
        <Box
          w="40px"
          h="40px"
          background="blue.500"
          borderRadius="md"
          padding="2"
        />
      )}
      <Box textAlign="start" m="2">
        {solution}
      </Box>
    </Flex>
  )
}

export default Solution
