import React from 'react'

import { Box, Image, Heading, Text, Badge } from '@hub/common/components'

export interface CardProps {
  id: string
  nome: string
  descricao: string
  arquivo: string
  notificacao?: string | number
  ativo: boolean
  url?: string
  handlePush: (url: string) => void
}

const CardProduct: React.FC<{ cor: string; card: CardProps }> = ({
  card,
  cor
}) => {
  const { nome, arquivo, descricao, handlePush, url = '' } = card

  return (
    <Box
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      height="8.5rem"
      minW={['10.25rem', '10.25rem', '19.25rem']}
      boxShadow="sm"
      style={{ position: 'relative' }}
    >
      <Box
        h="100%"
        minWidth={['4.7rem', '5.9375rem']}
        d="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor={cor}
        p="0.625rem"
      >
        <Image
          height={['auto', 'auto', '3.875rem', '3.875rem']}
          width={['3rem', '3rem', 'auto', 'auto']}
          objectFit="contain"
          src={arquivo}
        />
      </Box>

      <Box
        data-testid="button"
        as="button"
        p={['4', '4', '1.1rem']}
        outline="none"
        boxShadow="none"
        onClick={() => handlePush(url)}
      >
        {card?.notificacao && (
          <Badge
            position="absolute"
            right="1rem"
            top="1rem"
            backgroundColor="#D81B60"
            color="white"
            w="20px"
            h="20px"
            rounded="100%"
            fontSize="0.75rem"
          >
            {card?.notificacao}
          </Badge>
        )}
        <Box
          d="flex"
          textAlign="left"
          alignItems="baseline"
          flexDirection="column"
          h="100%"
          pr="1.125rem"
        >
          <Heading as="b" fontWeight="normal" fontSize="1.125rem" color="black">
            {nome}
          </Heading>
          <Text mt="2" color="gray.500" fontSize="0.875rem">
            {descricao}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default CardProduct
