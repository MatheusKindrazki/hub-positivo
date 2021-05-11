import React from 'react'

import { Box, Stack, Image, Text } from '@psdhub/common/components'

import lookingForIcon from './lookingForIcon.svg'

const EmptyTrash: React.FC = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      bg="gray.300"
      spacing="5"
      direction={['column', 'row']}
    >
      <Box>
        <Image
          alt="Ícone de cérebro procurando por algo"
          src={lookingForIcon}
        />
      </Box>
      <Box>
        <Text fontWeight="700" color="blue.500">
          Sua lixeira está vazia!
        </Text>
        <Text>Quando você excluir uma solução, ela aparecerá aqui.</Text>
      </Box>
    </Stack>
  )
}

export default EmptyTrash
