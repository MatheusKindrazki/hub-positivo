import React from 'react'

import classNames from 'classnames'

import { Box, Text, Image } from '@psdhub/common/components'

import GlobalStyle from './styles'
export interface CardProps {
  id: string
  nome: string
  descricao: string
  cor: string
  arquivo: string
  notificacao?: string | number
  ativo: boolean
  link?: string
  tipoRenderizacao: string
}

export interface HandleProps {
  url: string
  tipoRenderizacao: string
  nome: string
}

interface CardRenderProps {
  card: CardProps
  onClick: (data: HandleProps) => void
}

const Card: React.FC<CardRenderProps> = ({ card, onClick }) => {
  const { nome, arquivo, link, cor, tipoRenderizacao } = card

  return (
    <>
      <Box
        d="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        className={classNames({
          'hub-card-header-disabled': !link
        })}
        cursor="pointer"
        onClick={() => onClick({ nome, url: link || '', tipoRenderizacao })}
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

      <GlobalStyle />
    </>
  )
}

export default Card
