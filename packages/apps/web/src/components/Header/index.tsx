import React, { useCallback } from 'react'

import Headroom from 'react-headroom'
import {
  Question,
  Megaphone,
  Bell,
  List as HamburgerMenu
} from 'phosphor-react'

import { useDispatch } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'

import { useMediaQuery } from '@psdhub/common/hooks'
import { Box, Button } from '@psdhub/common/components'

import history from '~/services/history'

import Logo from '~/components/LogoOn'

import EducationalLevelMenu from './components/EducationalLevelMenu/EducationalLevelMenu'
import { SchoolLabel, HeaderButton } from './components'
import './styles'
interface HeaderProps {
  schoolName: string
  educationalLevels?: string[]
}

const Header: React.FC<HeaderProps> = ({ schoolName, educationalLevels }) => {
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const dispatch = useDispatch()

  const handleSignOut = useCallback(async () => {
    dispatch(signOut())
    setTimeout(() => history.push('/login'), 500)
  }, [dispatch])

  return (
    <Headroom disable={isDesktop} style={{ zIndex: 2 }}>
      {schoolName && <SchoolLabel schoolName={schoolName} />}
      <Box
        flexWrap="wrap"
        px="13%"
        background="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        zIndex={99999}
      >
        <Box className="hub-logo-wrapper">
          <HeaderButton
            as={HamburgerMenu}
            onClick={() => console.log('click')}
          />
          <Button variant="ghost" onClick={() => history.push('/')}>
            <Logo />
          </Button>
        </Box>

        <Box>
          <HeaderButton as={Megaphone} onClick={() => console.log('click')} />
          <HeaderButton as={Question} onClick={() => console.log('click')} />
          <HeaderButton as={Bell} onClick={() => console.log('click')} />
          <HeaderButton children="sair" onClick={handleSignOut} />
        </Box>
      </Box>
      {educationalLevels && (
        <EducationalLevelMenu educationalLevels={educationalLevels} />
      )}
    </Headroom>
  )
}

export default Header
