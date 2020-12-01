import React, { useCallback, useContext } from 'react'

import { Box, Button } from '@hub/common/components'
import { ArrowLeft } from '@hub/common/components/Icons'
import { useMediaQuery } from '@hub/common/layout/styles'

import { AuthContext } from '../../hooks/auth'
import Logo from '../Logo'
import HeaderDesktop from './HeaderDesktop'

const Header: React.FC = () => {
  const { token } = useContext(AuthContext)

  const handleGoBack = useCallback(() => {
    window.location.href = process.env.HUB_URL_FRONT || ''
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
        {token && <>{isDesktop && <HeaderDesktop />}</>}
      </Box>
    </Box>
  )
}

export default Header
