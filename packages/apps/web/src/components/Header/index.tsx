import React, { useCallback, useRef } from 'react'

import Headroom from 'react-headroom'
import {
  Question,
  Megaphone,
  Bell,
  List as HamburgerMenu
} from 'phosphor-react'

import { useMediaQuery } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

<<<<<<< HEAD
import EducationalLevelMenu from './components/EducationalLevelMenu/EducationalLevelMenu'
import AnimateGoBack from './components/AnimateGoBack'
import { SchoolLabel, HeaderButton } from './components'
import './styles'
import ModalSignOut, { ModalHandler } from '../ModalSignOut/ModalSignOut'
export interface HeaderProps {
  handleGoBack: () => void | Promise<void>
  schoolName?: string
}
=======
import { useMediaQuery, useDisclosure } from '@psdhub/common/hooks'
import { Box, Button, Modal } from '@psdhub/common/components'

import history from '~/services/history'

import Logo from '~/components/LogoOn'

import { HeaderProvider } from './context'
import MobileMenu, { MenuButton, RefMenuProps } from './components/Mobile'
import DesktopMenu from './components/Desktop'
import AlterPass from './components/AlterPass'

const Header: React.FC = () => {
  const { signed } = useSelector((state: Store.State) => state.auth)
  const { nobreak } = useSelector((state: Store.State) => state.noBreakAccess)

  const { isOpen, onOpen, onClose } = useDisclosure()
>>>>>>> refactor: remover menubar do header

const Header: React.FC<HeaderProps> = ({ schoolName, handleGoBack }) => {
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const modalRef = useRef<ModalHandler>(null)

  const openModal = useCallback(() => {
    modalRef.current?.onOpen()
  }, [])

  return (
<<<<<<< HEAD
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
=======
    <HeaderProvider>
      <Headroom disable={isDesktop} style={{ zIndex: 2 }}>
>>>>>>> refactor: remover menubar do header
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
              <AnimateGoBack onClick={handleGoBack} />
            </Box>
          </Box>

          <Box>
            <HeaderButton as={Megaphone} onClick={() => console.log('click')} />
            <HeaderButton as={Question} onClick={() => console.log('click')} />
            <HeaderButton as={Bell} onClick={() => console.log('click')} />
            <HeaderButton children="Sair" onClick={openModal} />
            <ModalSignOut ref={modalRef} />
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
