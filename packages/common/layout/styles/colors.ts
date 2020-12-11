import { theme } from '@chakra-ui/react'
import { lighten, darken } from 'polished'
type Colors = typeof theme.colors

export const profileBaseColor = {
  default: '#1565C0',
  editor: '#1565C0',
  colaborador: '#1565C0',
  gestor: '#8835A7',
  administrador: '#1565C0',
  coordenador: '#8835A7',
  professor: '#21B0A3',
  aluno: '#DCAA41',
  família: '#DC6A3C'
}

type StringPropsKeys<T extends { [key: string]: string }> = {
  [P in keyof T]: string
}

export type VariantsProps = keyof StringPropsKeys<typeof profileBaseColor>

const HubProfileColors = ({ profile }: { profile: VariantsProps }): Colors => {
  return {
    ...theme.colors,
    blue: {
      50: lighten(0.5, profileBaseColor[profile]),
      100: lighten(0.4, profileBaseColor[profile]),
      200: lighten(0.3, profileBaseColor[profile]),
      300: lighten(0.2, profileBaseColor[profile]),
      400: lighten(0.1, profileBaseColor[profile]),
      500: 'var(--hub-base-color)',
      600: darken(0.1, profileBaseColor[profile]),
      700: darken(0.1, profileBaseColor[profile]),
      800: darken(0.1, profileBaseColor[profile]),
      900: darken(0.1, profileBaseColor[profile])
    }
  }
}

export default HubProfileColors
