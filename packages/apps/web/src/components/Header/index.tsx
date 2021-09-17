import React from 'react'

import Headroom from 'react-headroom'
import {
  Question,
  Megaphone,
  Bell,
  List as HamburgerMenu
} from 'phosphor-react'

import { useMediaQuery } from '@psdhub/common/hooks'
import { Box, Button } from '@psdhub/common/components'

import history from '~/services/history'

import Logo from '~/components/LogoOn'

import EducationalLevelMenu from './components/EducationalLevelMenu/EducationalLevelMenu'
import { SchoolLabel, HeaderButton } from './components'
import './styles'
export interface HeaderProps {
  handleSignOut: () => void
  schoolName?: string
}

const Header: React.FC<HeaderProps> = ({ schoolName, handleSignOut }) => {
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  return (
    <Headroom disable={isDesktop} style={{ zIndex: 2 }}>
      {schoolName && <SchoolLabel schoolName={schoolName} />}
      <Box
        h="12"
        d="flex"
        flexDirection="column"
        background="white"
        zIndex={99999}
      >
        <Box
          pb="2"
          width="100%"
          margin="0 auto"
          maxWidth="1400px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box className="hub-logo-wrapper">
            <HeaderButton
              as={HamburgerMenu}
              onClick={() => console.log('click')}
            />
            <Button
              data-testid="logo-button"
              m="0"
              p="1"
              variant="ghost"
              onClick={() => history.push('/')}
            >
              <Logo />
            </Button>
          </Box>

          <Box>
            <HeaderButton
              as={Megaphone}
              onClick={() => console.log('click')}
              data-testid="megaphone-button"
            />
            <HeaderButton
              as={Question}
              onClick={() => console.log('click')}
              data-testid="question-button"
            />
            <HeaderButton
              as={Bell}
              onClick={() => console.log('click')}
              data-testid="notifications-button"
            />
            <HeaderButton
              children="sair"
              onClick={handleSignOut}
              data-testid="logout-button"
            />
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
