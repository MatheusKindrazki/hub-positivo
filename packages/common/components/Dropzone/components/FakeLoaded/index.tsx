import React from 'react'

import { Progress } from '@chakra-ui/react'

import { useTheme } from '../../../../layout'
import { Text, Box } from '../../..'

export interface fakeProressProps {
  filename: string
  width: string
  loading: boolean
}

const FakeLoaded: React.FC<Partial<fakeProressProps>> = ({
  filename,
  ...rest
}) => {
  const { colors } = useTheme()

  return (
    <Box>
      <Box d="flex" justifyContent="space-between" width="34rem" mb="0.7rem">
        <Text>{filename}</Text>
        <Text>100%</Text>
      </Box>
      <Progress
        value={100}
        color={colors.blue[500]}
        width="100%"
        borderRadius="8px"
        {...rest}
      />
    </Box>
  )
}

export default FakeLoaded
