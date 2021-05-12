import React from 'react'

import { useMediaQuery } from '@psdhub/common/hooks'
import { Box, Select } from '@psdhub/common/components'

import GlobalStyle from './styles'
import { HeaderProvider } from './components/Desktop/context'
import DesktopOptions from './components/Desktop'
import Logo from '../Logo'
import { useAuth } from '../../context/authContext'

export const enableProfile = ['PROFESSOR', 'ALUNO']

export const mockLevels = [
  { label: 'Educação Infantil', value: 'EI' },
  { label: 'Ensino Fundamental Anos Iniciais', value: 'EF1' },
  { label: 'Ensino Fundamental Anos Finais', value: 'EF2' },
  { label: 'Ensino Médio', value: 'EM' }
]

const Header: React.FC = () => {
  const { signed, loggedData, setLevel } = useAuth()

  const { selected_profile } = loggedData

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
        {isDesktop && (
          <Box d="flex" alignItems="center">
            {enableProfile.includes(selected_profile?.id) && (
              <Box mr="4" width="280px">
                <Select
                  variant="normal"
                  defaultValue={mockLevels[0]}
                  placeholder="Selecione o Nivel de ensino"
                  inputHeight={40}
                  onChange={e => setLevel(e)}
                  options={mockLevels}
                />
              </Box>
            )}
            <HeaderProvider>
              <DesktopOptions />
            </HeaderProvider>
          </Box>
        )}
      </Box>
      <GlobalStyle />
    </>
  )
}

export default Header
