import React from 'react'

import { useMediaQuery } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import GlobalStyle from './styles'
import { HeaderProvider } from './components/Desktop/context'
import DesktopOptions from './components/Desktop'
import Logo from '../Logo'
import { useAuth } from '../../context/authContext'

const Header: React.FC = () => {
  const { signed } = useAuth()

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  if (!signed) return null

  return (
    <>
      <Box
        pos="absolute"
        top="-73px"
        left="0"
        zIndex="overlay"
        w="100%"
        h="72px"
        bg="white"
        p="4"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #D9D9D9"
      >
        <Box
          className="hub-logo"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo />
        </Box>
        {isDesktop ? (
          <HeaderProvider>
            <DesktopOptions />
          </HeaderProvider>
        ) : null}
      </Box>
      <GlobalStyle />
    </>
  )
}

export default Header
