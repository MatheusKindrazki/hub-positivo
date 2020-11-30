import { theme } from '@chakra-ui/react'

type DefaultTheme = typeof theme

declare module '@chakra-ui/react' {
  export declare function useTheme(): DefaultTheme
}
