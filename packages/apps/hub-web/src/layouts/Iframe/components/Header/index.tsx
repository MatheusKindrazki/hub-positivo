import React, { useCallback } from 'react'

import { Box } from '@hub/common/components'
import { useMediaQuery } from '@hub/common/layout/styles'

import history from '~/services/history'
import { CardProduct } from '~/store/modules/products/types'

import AnimateGoBack from './AnimateGoBack'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

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
      <AnimateGoBack onClick={handleGoBack} />
      <Box position="relative">
        {isDesktop && <HeaderDesktop handlePush={handlePush} cards={cards} />}
        {!isDesktop && <HeaderMobile handlePush={handlePush} cards={cards} />}
      </Box>
    </Box>
  )
}

export default Header
