import { theme, DefaultTheme } from '@chakra-ui/core';

const customTheme: DefaultTheme = {
  ...theme,
  fontSizes: {
    ...theme.fontSizes,
    xl: '2rem',
  },
  fonts: {
    body: 'Nunito, system-ui, sans-serif',
    heading: 'Nunito, system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700,
  },
  shadows: {
    ...theme.shadows,
    md: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  radii: {
    ...theme.radii,
    sm: '5px',
    md: '8px',
  },
  colors: {
    ...theme.colors,
    blue: {
      ...theme.colors.blue,
      500: '#1E88E5',
    },
    gray: {
      ...theme.colors.gray,
      200: '#ECEFF1',
      300: '#F4F6F8',
      400: '#E5E5E5',
      500: '#7A7A7A',
      600: '#3C3C3C',
      700: '#202024',
      800: '#121214',
    },
  },
};

export default customTheme;
