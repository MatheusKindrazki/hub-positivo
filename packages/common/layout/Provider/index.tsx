import React, { useMemo } from 'react'

import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react'

import { ThemeProvider as StyledProvider } from 'styled-components'

import { theme as HubTheme } from '../styles'
import profileColors, {
  VariantsProps,
  profileBaseColor
} from '../styles/colors'

const ThemeContainer: React.FC = ({ children }) => {
  const renderTheme = useMemo(() => {
    const profileTheme = profileColors({
      profile: 'default'
    }).blue

    const hubThemeProfile = {
      ...HubTheme,
      colors: {
        ...HubTheme.colors,
        blue: profileTheme
      }
    }

    // !Apenas para efeito de animação
    document.documentElement.style.setProperty(
      '--hub-base-color',
      profileBaseColor['default' as VariantsProps]
    )

    return extendTheme({ ...hubThemeProfile })
  }, [])

  return (
    <ChakraProvider theme={renderTheme}>
      <StyledProvider theme={renderTheme}>
        <CSSReset />
        {children}
      </StyledProvider>
    </ChakraProvider>
  )
}

export default ThemeContainer
