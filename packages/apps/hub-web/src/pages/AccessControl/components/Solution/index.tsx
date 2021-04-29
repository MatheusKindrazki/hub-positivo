import React from 'react'

import { Flex, Box } from '@psdhub/common/components'

import Square from '~/components/Square'
import GrabIcon from '~/components/GrabIcon'

interface SolutionProps {
  solution: string
  order?: string
}

const Solution: React.FC<SolutionProps> = ({ solution, order }) => {
  return (
    <Flex alignItems="center">
      <Box>
        <GrabIcon />
      </Box>
      <Box m="2">{order || '1'}</Box>
      <Square />
      <Box textAlign="start" m="2">
        {solution}
      </Box>
    </Flex>
  )
}

export default Solution
