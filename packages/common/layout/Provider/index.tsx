import React, { useMemo, useState, useContext } from 'react'

import { ThemeProvider as StyledProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import { ChakraProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react'

import ThemeContext from './context'
import { cssKey } from './config'
import GlobalStyles from '../styles/global'
import profileColors, { VariantsProps } from '../styles/colors'
import { theme as HubTheme, Theme } from '../styles'

interface ThemeProps {
  cssVarPrefix?: string
  theme?: Partial<Theme>
}

const ThemeContainer: React.FC<ThemeProps> = ({
  children,
  theme,
  cssVarPrefix
}) => {
  const [prof, setProfile] = useState<VariantsProps>('default')
  const context = useContext(ThemeContext)

  context.theme = ({ profile }) => setProfile(profile)

  const renderTheme = useMemo(() => {
    const profileTheme = profileColors({
      profile: prof
    }).blue

    const theme = HubTheme(cssVarPrefix)

    const hubThemeProfile = {
      ...theme,
      colors: {
        ...theme.colors,
        blue: profileTheme
      }
    }

    return hubThemeProfile
  }, [cssVarPrefix, prof])

  return (
    <CacheProvider value={createCache({ key: cssKey })}>
      <ChakraProvider theme={{ ...renderTheme, ...theme }} resetCSS>
        <ColorModeProvider
          options={{ initialColorMode: 'light', useSystemColorMode: false }}
        >
          <StyledProvider theme={{ ...renderTheme, ...theme }}>
            <CSSReset />
            <GlobalStyles />
            {children}
            <ToastContainer
              position="bottom-center"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeButton={false}
              limit={3}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </StyledProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default ThemeContainer
