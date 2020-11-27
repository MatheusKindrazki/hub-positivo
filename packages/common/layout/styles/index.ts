import {
  useTheme,
  useMediaQuery,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import baseStyled, { ThemedStyledInterface } from 'styled-components'

import chakra from './chackra'

export const theme = chakra

export type Theme = typeof theme
const styled = baseStyled as ThemedStyledInterface<Theme>

export { styled, useTheme, useMediaQuery, useColorMode, useColorModeValue }
