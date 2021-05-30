import React from 'react'

import { Stack, Image, Text } from '@psdhub/common/components'

import { imageSquare } from '~/assets'

import { imageStyles } from './styles'

interface SolutionProps {
  solution: string
  file: string
  activated?: boolean
}

const Solution: React.FC<SolutionProps> = ({ solution, file }) => {
  return (
    <Stack alignItems="center" direction="row" spacing="1">
      <Image
        {...imageStyles}
        fallbackSrc={imageSquare}
        src={file}
        background="blue.500"
        padding="2"
      />
      <Text maxW="75%" alignContent="center" noOfLines={1}>
        {solution}
      </Text>
    </Stack>
  )
}

export default Solution
