import baseStyled, { ThemedStyledInterface } from 'styled-components'

import { Dict } from '@chakra-ui/utils'
import {
  useTheme,
  useMediaQuery,
  useColorMode,
  extendTheme as themeChakra,
  withDefaultColorScheme,
  useColorModeValue,
  ThemeOverride,
  Theme
} from '@chakra-ui/react'

import chakra from './chakra'

export const theme = chakra

export type { Theme }

const extendTheme = (data: ThemeOverride<Theme>): Dict<any> => {
  return themeChakra(data, withDefaultColorScheme({ colorScheme: 'blue' }))
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
