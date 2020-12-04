import React, { useCallback } from 'react'

import { Box, Button } from '@hub/common/components'
import { ArrowLeft } from '@hub/common/components/Icons'
import { useMediaQuery } from '@hub/common/layout/styles'

import history from '~/services/history'
import { CardProduct } from '~/store/modules/products/types'

import Logo from '../Logo'
import HeaderDesktop from './HeaderDesktop'

export interface HeaderProps {
  handlePush: (url: string) => void
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
      height="72px"
      background="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #D9D9D9"
      position="fixed"
      zIndex="99999"
    >
      <Box
        className="hub-logo"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          paddingLeft="0px"
          background="transparent!important"
          onClick={handleGoBack}
        >
          <Box as={ArrowLeft} size={24} color="blue.500" />
        </Button>
        <Logo />
      </Box>
      <Box position="relative">
        {isDesktop && <HeaderDesktop handlePush={handlePush} cards={cards} />}
      </Box>
    </Box>
  )
}

export default Header
