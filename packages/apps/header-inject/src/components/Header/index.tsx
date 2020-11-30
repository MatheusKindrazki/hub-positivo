import React, { useCallback } from 'react'

import { Box, Button } from '@hub/common/components'
import { ArrowLeft } from '@hub/common/components/Icons'

import Logo from '../Logo'

const Header: React.FC = () => {
  const handleGoBack = useCallback(() => {
    window.location.href = process.env.HUB_URL_FRONT || ''
  }, [])

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
      <Button
        fontSize="0.875rem"
        backgroundColor="white"
        fontWeight="bold"
        color="blue.500"
        mx="1"
      >
        Produtos
      </Button>
    </Box>
  )
}

export default Header
