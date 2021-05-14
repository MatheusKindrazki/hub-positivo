import baseStyled, { ThemedStyledInterface } from 'styled-components'

import {
  useTheme,
  useMediaQuery,
  extendTheme as extendsTheme,
  useColorMode,
  useColorModeValue,
  ThemeOverride,
  Theme
} from '@chakra-ui/react'

import chakra from './chakra'

export const theme = chakra

export type { Theme }

const extendTheme = (data: ThemeOverride<Theme>): Theme => {
  return extendsTheme(data)
}

const styled = baseStyled as ThemedStyledInterface<Theme>
export {
  styled,
  useTheme,
  useMediaQuery,
  useColorMode,
  useColorModeValue,
  extendTheme
}
