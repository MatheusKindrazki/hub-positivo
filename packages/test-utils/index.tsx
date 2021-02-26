import React, { FC, ReactElement } from 'react'

import { render, RenderResult } from '@testing-library/react'
import { RenderOptions } from '@testing-library/react'

import ThemeProviderHub from '@hub/common/layout/Provider'
export const Providers: FC = ({ children }) => {
  return <ThemeProviderHub>{children}</ThemeProviderHub>
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'

export { customRender as render }
