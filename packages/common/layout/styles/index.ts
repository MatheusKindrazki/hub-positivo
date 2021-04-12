import baseStyled, { ThemedStyledInterface } from 'styled-components'

import {
  useTheme,
  useMediaQuery,
  extendTheme,
  useColorMode,
  useColorModeValue,
  Theme
} from '@chakra-ui/react'

import chakra from './chakra'

export const theme = chakra

export type { Theme }

const styled = baseStyled as ThemedStyledInterface<Theme>
export {
  styled,
  useTheme,
  useMediaQuery,
  useColorMode,
  useColorModeValue,
  extendTheme
}
