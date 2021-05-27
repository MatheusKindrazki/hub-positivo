import React from 'react'

import { Stack, Box, Image, Text } from '@psdhub/common/components'

interface SolutionProps {
  solution: string
  file: string
  activated?: boolean
}

const Solution: React.FC<SolutionProps> = ({ solution, file }) => {
  return (
    <Stack alignItems="center" direction="row" spacing="1">
      {file ? (
        <Image
          src={file}
          w="40px"
          h="40px"
          background="blue.500"
          borderRadius="md"
          padding="2"
          alt="Imagem da solução"
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
      <Text maxW="75%" alignContent="center" noOfLines={1}>
        {solution}
      </Text>
    </Stack>
  )
}

export default Solution
