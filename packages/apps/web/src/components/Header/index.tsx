import React, { useCallback } from 'react'

import Headroom from 'react-headroom'
import {
  Question,
  Megaphone,
  Bell,
  List as HamburgerMenu
} from 'phosphor-react'

import { useMediaQuery } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import EducationalLevelMenu from './components/EducationalLevelMenu/EducationalLevelMenu'
import AnimateGoBack from './components/AnimateGoBack'
import { SchoolLabel, HeaderButton } from './components'
import './styles'
export interface HeaderProps {
  handlePush: (to: string) => void | Promise<void>
  schoolName?: string
}

const Header: React.FC<HeaderProps> = ({ schoolName, handlePush }) => {
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleSignOut = useCallback(() => handlePush('/login'), [handlePush])

  const handleGoback = useCallback(() => handlePush('/'), [handlePush])

  return (
    <Headroom disable={isDesktop} style={{ zIndex: 2 }}>
      {schoolName && <SchoolLabel schoolName={schoolName} />}
      <Box
        h="14"
        d="flex"
        flexDirection="column"
        background="white"
        justifyContent="center"
        zIndex={99999}
      >
        <Box
          width="100%"
          margin="0 auto"
          maxWidth="1400px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box d="flex">
            <HeaderButton
              as={HamburgerMenu}
              onClick={() => console.log('click')}
            />
            <Box>
              <AnimateGoBack onClick={handleGoback} />
            </Box>
          </Box>

          <Box>
            <HeaderButton as={Megaphone} onClick={() => console.log('click')} />
            <HeaderButton as={Question} onClick={() => console.log('click')} />
            <HeaderButton as={Bell} onClick={() => console.log('click')} />
            <HeaderButton children="sair" onClick={handleSignOut} />
          </Box>
        </Box>
      </Box>
      <Box w="100%" backgroundColor="white" borderBottom="1px solid #C9C9C9">
        <Box
          d="flex"
          flex="1"
          w="100%"
          m="0 auto"
          alignItems="flex-end"
          maxWidth="1400px"
          backgroundColor="white"
        >
          <EducationalLevelMenu />
        </Box>
      </Box>
    </Headroom>
  )
}

export default Header
