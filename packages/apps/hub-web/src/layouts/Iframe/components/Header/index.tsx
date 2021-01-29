import React, { useCallback } from 'react'

import { CardProduct } from '~/store/modules/products/types'

import { useMediaQuery } from '@hub/common/layout/styles'
import { Box } from '@hub/common/components'

import history from '~/services/history'

import HeaderMobile from './HeaderMobile'
import HeaderDesktop from './HeaderDesktop'
import AnimateGoBack from './AnimateGoBack'

interface HandleProps {
  url: string
  tipoRenderizacao: string
  nome: string
}
export interface HeaderProps {
  handlePush: (data: HandleProps) => void
  cards?: CardProduct[]
}

const Header: React.FC<HeaderProps> = ({ handlePush, cards }) => {
  const handleGoBack = useCallback(() => {
    history.push('/')
  }, [])

  const [isDesktop] = useMediaQuery('(min-width: 480px)')
  return (
    <Box
      p="4"
      width="100%"
      height={isDesktop ? '72px' : '41px'}
      background="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #D9D9D9"
      position="fixed"
      top="0"
      left="0"
      zIndex="99999"
    >
      <AnimateGoBack onClick={handleGoBack} width={isDesktop ? 60 : 40} />
      <Box position="relative">
        {isDesktop && <HeaderDesktop handlePush={handlePush} cards={cards} />}
        {!isDesktop && <HeaderMobile handlePush={handlePush} cards={cards} />}
      </Box>
    </Box>
  )
}

export default Header
