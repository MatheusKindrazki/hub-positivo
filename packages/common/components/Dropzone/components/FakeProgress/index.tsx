import React, { useEffect, useState } from 'react'

import { Progress } from '@chakra-ui/react'

import { useTheme } from '../../../../layout'
import { Text, Box } from '../../..'

export interface fakeProressProps {
  filename: string
  width: string
  loading: boolean
}

const FakeProgress: React.FC<Partial<fakeProressProps>> = ({
  filename,
  ...rest
}) => {
  const [value, setValue] = useState(0)
  const { colors } = useTheme()

  useEffect(() => {
    if (value < 100) setTimeout(() => setValue(value + 2), 50)
  }, [value])

  return (
    <Box>
      <Box d="flex" justifyContent="space-between" w="34rem" mb="0.7rem">
        <Text>{filename}</Text>
        <Text>{value}%</Text>
      </Box>
      <Progress
        value={value}
        color={colors.blue[500]}
        width="100%"
        borderRadius="8px"
        {...rest}
      />
    </Box>
  )
}

export default FakeProgress
