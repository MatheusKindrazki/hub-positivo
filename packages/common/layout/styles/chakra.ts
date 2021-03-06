import { theme } from '@chakra-ui/react'

type DefaultTheme = typeof theme

const customTheme: DefaultTheme = {
  ...theme,

  fontSizes: {
    ...theme.fontSizes
  },
  fonts: {
    body: 'TTNorms, system-ui, sans-serif',
    heading: 'TTNorms, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700
  },
  shadows: {
    ...theme.shadows,
    sm: '0px 1px 2px rgba(0, 0, 0, 0.15)',
    md: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    'dark-lg': 'rgba(0, 0, 20, 0.2) 0px 5px 30px;'
  },
  radii: {
    ...theme.radii,
    sm: '5px',
    md: '8px'
  },
  colors: {
    ...theme.colors,
    black: '#3C3C3C',
    gray: {
      ...theme.colors.gray,
      100: '#D9D9D9;',
      200: '#ECEFF1',
      300: '#F4F6F8',
      400: '#E5E5E5',
      500: '#7A7A7A',
      600: '#3C3C3C',
      700: '#202024',
      800: '#121214'
    }
  }
}

export default customTheme
