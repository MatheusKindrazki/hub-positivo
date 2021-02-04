import React, { FC, ReactElement } from 'react'

import { render, RenderResult } from '@testing-library/react'
import { RenderOptions } from '@testing-library/react'

import ThemeProvider from '@hub/common/layout/Provider'

const Providers: FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'

export { customRender as render }
