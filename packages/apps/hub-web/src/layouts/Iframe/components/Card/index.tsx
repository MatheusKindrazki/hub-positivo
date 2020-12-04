import React from 'react'

import { Box, Text, Image } from '@hub/common/components'

export interface CardProps {
  id: string
  nome: string
  descricao: string
  cor: string
  arquivo: string
  notificacao?: string | number
  ativo: boolean
  link?: string
}

interface CardRenderProps {
  card: CardProps
  onClick: (url: string) => void
}

const Card: React.FC<CardRenderProps> = ({ card, onClick }) => {
  const { nome, arquivo, link, cor } = card

  return (
    <Box
      d="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
      cursor="pointer"
      onClick={() => onClick(link || '')}
    >
      <Box
        backgroundColor={cor}
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
        mt="8px"
        fontSize="13px"
        lineHeight="14px!important"
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
