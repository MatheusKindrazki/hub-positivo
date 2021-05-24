import React from 'react'

import { Flex, Box, Image } from '@psdhub/common/components'

import GrabIcon from '~/components/GrabIcon'

interface SolutionProps {
  solution: string
  order: number
  file: string
  activated: boolean
}

const Solution: React.FC<SolutionProps> = ({
  solution,
  order,
  file,
  activated
}) => {
  return (
    <Flex alignItems="center" opacity={activated ? '1' : '0.5'}>
      <Box>
        <GrabIcon />
      </Box>
      <Box m="2" w="5">
        {order}
      </Box>
      {file && (
        <Image
          src={file}
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
