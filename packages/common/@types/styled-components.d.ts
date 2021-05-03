import { Theme } from '../layout/styles'

type ThemeInterface = Theme

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
