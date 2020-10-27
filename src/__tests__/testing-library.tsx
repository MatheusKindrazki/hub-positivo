import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import {
  render,
  RenderOptions,
  RenderResult,
  Queries,
} from '@testing-library/react';

import { theme as HubTheme } from '~/styles';

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={HubTheme}>
      <CSSReset /> {children}
    </ThemeProvider>
  );
};

export function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q>,
): RenderResult {
  return render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
}

export * from '@testing-library/react';

export { customRender as render };
