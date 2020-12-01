import React from 'react'

import { Box, Text, Image } from '@hub/common/components'

interface CardProps {
  id: string
  nome: string
  descricao: string
  arquivo: string
  notificacao?: string | number
  ativo: boolean
  link?: string
}
const Card: React.FC<CardProps> = props => {
  const { nome, arquivo, link } = props

  return (
    <Box
      w="5rem"
      d="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      cursor="pointer"
      onClick={() => console.log(link)}
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
        <Image objectFit="contain" src={arquivo} />
      </Box>
      <Text
        fontSize="sm"
        lineHeight="sm"
        color="black"
        noOfLines={2}
        textAlign="center"
      >
        {nome}
      </Text>
    </Box>
  )
}

export default Card
