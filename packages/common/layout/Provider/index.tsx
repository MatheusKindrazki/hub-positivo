import React, { useMemo, useState, useContext } from 'react'

import { ThemeProvider as StyledProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import { ChakraProvider, CSSReset } from '@chakra-ui/react'

import ThemeContext from './context'
import GlobalStyles from '../styles/global'
import profileColors, { VariantsProps } from '../styles/colors'
import { theme as HubTheme } from '../styles'

interface ThemeProps {
  cssVarPrefix?: string
}

const ThemeContainer: React.FC<ThemeProps> = ({ children, cssVarPrefix }) => {
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

  const classKey = process.env.REACT_APP_IS_HUB ? cssVarPrefix : 'hub-component'

  return (
    <CacheProvider value={createCache({ key: classKey || 'hub-component' })}>
      <ChakraProvider theme={renderTheme} resetCSS>
        <StyledProvider theme={renderTheme as any}>
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
      </ChakraProvider>
    </CacheProvider>
  )
}

export default ThemeContainer
