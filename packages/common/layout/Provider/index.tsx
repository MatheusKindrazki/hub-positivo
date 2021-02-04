import React, { useMemo, useState, useContext } from 'react'

import { ThemeProvider as StyledProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'

import { ChakraProvider, CSSReset } from '@chakra-ui/react'

import ThemeContext from './context'
import GlobalStyles from '../styles/global'
import profileColors, {
  VariantsProps,
  profileBaseColor
} from '../styles/colors'
import { theme as HubTheme } from '../styles'

if (process.env.NODE_ENV !== 'test') {
  require('react-toastify/dist/ReactToastify.css')
}

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
