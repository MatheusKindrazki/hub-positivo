import { createContext } from 'react'

import { VariantsProps } from '../styles/colors'

interface VariantThemeProps {
  profile: VariantsProps
}

interface ThemeProps {
  theme: (theme: VariantThemeProps) => void
}

const ThemeContext = createContext({} as ThemeProps)

export default ThemeContext
