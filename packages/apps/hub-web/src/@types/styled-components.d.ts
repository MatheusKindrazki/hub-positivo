import { theme } from '@hub/common/layout/styles'

type ThemeInterface = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
