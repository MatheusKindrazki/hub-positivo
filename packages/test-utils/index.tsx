import React, { FC, ReactElement } from 'react'

import { ThemeProvider as StyledProvider } from 'styled-components'
import { render, RenderResult } from '@testing-library/react'
import { RenderOptions } from '@testing-library/react'

import theme from '@hub/common/layout/styles/chakra'

import { ThemeProvider } from '@chakra-ui/react'

const Providers: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeProvider>
  )
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'

export { customRender as render }
