import React from 'react'

import { Box, Text, Image } from '@hub/common/components'

interface CardProps {
  nome: string
  arquivo: string
}

const Card: React.FC<CardProps> = () => {
  return (
    <Box
      w="5rem"
      d="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        backgroundColor="blue.500"
        w="3rem"
        h="3rem"
        borderRadius="50%"
        overflow="hidden!important"
        d="flex"
        justifyContent="center"
        alignContent="center"
        p="8px!important"
      >
        <Image
          objectFit="contain"
          src="https://sthubdigitalassetsdev001.blob.core.windows.net/imagenscards/405f9d63f1244c919ede1ad101ffdbc1%23atividades.svg"
        />
      </Box>
      <Text fontSize="sm" color="black" noOfLines={2} textAlign="center">
        Teste solução
      </Text>
    </Box>
  )
}

export default Card
