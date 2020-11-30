import React from 'react'

import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Tooltip
} from '@hub/common/components'

import { Skeleton } from '@chakra-ui/react'
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
}

const CardProduct: React.FC<CardProductProps> = ({
  card,
  cor,
  handlePush,
  load = true
}) => {
  const { nome, arquivo, descricao, link = '' } = card

  return (
    <Container
      className={classNames({
        disabled: !link
      })}
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      height="8.5rem"
      minW={['10.25rem', '10.25rem', '19.25rem']}
      boxShadow="sm"
      style={{ position: 'relative' }}
    >
      <Skeleton startColor="gray.200" endColor="gray.400" isLoaded={!load}>
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
      </Skeleton>

      <Box
        data-testid="button"
        as="button"
        p={['4', '4', '1.1rem']}
        outline="none"
        boxShadow="none"
        onClick={() => handlePush(link)}
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
          <Skeleton
            startColor="gray.50"
            endColor="gray.400"
            height={load ? '10px' : 'auto'}
            width={load ? '130px' : '100%'}
            isLoaded={!load}
          >
            <Heading
              as="b"
              fontWeight="normal"
              fontSize="1.125rem"
              color="black"
            >
              {nome}
            </Heading>
          </Skeleton>
          <Skeleton
            startColor="gray.50"
            endColor="gray.400"
            mt={load ? 4 : 0}
            height={load ? '10px' : 'auto'}
            width={load ? '170px' : '100%'}
            isLoaded={!load}
          >
            <Tooltip hasArrow label={descricao} openDelay={500} w="21rem">
              <Text mt="2" color="gray.500" noOfLines={2} fontSize="0.875rem">
                {descricao}
              </Text>
            </Tooltip>
          </Skeleton>
          <Skeleton
            startColor="gray.50"
            endColor="gray.400"
            mt="2"
            height={load ? '10px' : 'auto'}
            width={load ? '120px' : '100%'}
            isLoaded={!load}
          ></Skeleton>
        </Box>
      </Box>
    </Container>
  )
}

export default CardProduct
