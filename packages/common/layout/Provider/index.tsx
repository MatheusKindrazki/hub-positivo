import React, { useMemo, useState, useContext } from 'react'

import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider as StyledProvider } from 'styled-components'

import { theme as HubTheme } from '../styles'
import profileColors, {
  VariantsProps,
  profileBaseColor
} from '../styles/colors'
import GlobalStyles from '../styles/global'
import ThemeContext from './context'
const ThemeContainer: React.FC = ({ children }) => {
  const [profile, setProfile] = useState<VariantsProps>('default')

  const context = useContext(ThemeContext)

  context.theme = ({ profile }) => {
    setProfile(profile)
  }

  const renderTheme = useMemo(() => {
    const profileTheme = profileColors({
      profile: profile
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
      profileBaseColor[profile as VariantsProps]
    )

    return hubThemeProfile
  }, [profile])

  return (
    <ChakraProvider theme={renderTheme}>
      <StyledProvider theme={renderTheme}>
        <CSSReset />
        <GlobalStyles />
        {children}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          closeButton={false}
          hideProgressBar
          limit={3}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </StyledProvider>
    </ChakraProvider>
  )
}

export default ThemeContainer
