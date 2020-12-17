import React, { useMemo } from 'react'

import { Box, Image, Heading, Text, Badge } from '@hub/common/components'
import createSlug from '@hub/common/utils/createSlug'

import classNames from 'classnames'

import { Container } from './styles'

export interface CardProps {
  id: string
  nome: string
  descricao: string
  arquivo: string
  notificacao?: string | number
  ativo: boolean
  link?: string
}

interface CardProductProps {
  handlePush: (url: string) => void
  cor: string
  card: CardProps
  load?: boolean
  category?: string
}

const CardProduct: React.FC<CardProductProps> = ({
  card,
  cor,
  category,
  handlePush
}) => {
  const { nome, arquivo, descricao, link = '' } = card

  const renderCardName = useMemo(() => {
    return `${createSlug(category || 'hub')}-${createSlug(nome)}`
  }, [nome, category])

  return (
    <Container
      data-categoria={`${category}`}
      data-solucao={`${nome}`}
      className={classNames({
        disabled: !link,
        isHover: true,
        'hub-card-solucao': true
      })}
      id={`${renderCardName}`}
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      height="8.5rem"
      minW={['7.25rem', '10.25rem', '10.25rem', '19.25rem']}
      onClick={() => handlePush(link)}
      boxShadow="sm"
      _hover={{
        boxShadow: 'dark-lg'
      }}
      style={{ position: 'relative' }}
    >
      {!link && (
        <Badge
          colorScheme="blue"
          w="75px"
          top="6px"
          right="6px"
          h="0.9375rem"
          borderRadius="4px"
          position="absolute"
          m="4px"
        >
          Em Breve
        </Badge>
      )}
      <Box
        h="100%"
        minWidth={['4.7rem', '5.9375rem']}
        d="flex"
        justifyContent="center"
        alignItems="center"
        pointerEvents="none"
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
        className="card-click"
        pointerEvents="none"
        p={['4', '4', '1.1rem']}
        outline="none"
        boxShadow="none"
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
          pr="1rem"
        >
          <Heading as="b" fontWeight="normal" fontSize="1.125rem" color="black">
            {nome}
          </Heading>
          <Text mt="2" color="gray.500" noOfLines={2} fontSize="1rem">
            {descricao}
          </Text>
        </Box>
      </Box>
    </Container>
  )
}

export default CardProduct
