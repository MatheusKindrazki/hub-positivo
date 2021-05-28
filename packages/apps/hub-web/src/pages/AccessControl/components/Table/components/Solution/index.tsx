import React from 'react'

import { Stack, Image, Text } from '@psdhub/common/components'

import { imageIcon } from '~/assets'

import { imageStyles } from './styles'
import { loadSolutionImage } from '../../utils/loadSolutionImage'

interface SolutionProps {
  solution: string
  file: string
  activated?: boolean
}

const SuccessImage = (file: string): React.ReactElement => {
  return <Image {...imageStyles} src={file} background="blue.500" padding="2" />
}

const FailImage = (): React.ReactElement => {
  return <Image {...imageStyles} src={imageIcon} background="transparent" />
}

const Solution: React.FC<SolutionProps> = ({ solution, file }) => {
  console.log({ file })
  return (
    <Stack alignItems="center" direction="row" spacing="1">
      {loadSolutionImage(file, SuccessImage(file), FailImage())}
      <Text maxW="75%" alignContent="center" noOfLines={1}>
        {solution}
      </Text>
    </Stack>
  )
}

export default Solution
