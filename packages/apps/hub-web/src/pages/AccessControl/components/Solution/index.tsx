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
    <Flex flexDirection="row" alignItems="center">
      <GrabIcon />
      <Box m="1">{order || '1'}</Box>
      <Square />
      <Box m="1">{solution}</Box>
    </Flex>
  )
}

export default Solution
