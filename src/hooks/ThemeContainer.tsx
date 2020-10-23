import React, { useState } from 'react';

import {
  ThemeProvider as ChakraThemeProvider,
  ColorModeProvider,
  CSSReset,
} from '@chakra-ui/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { ThemeProvider as StyledProvider } from 'styled-components';

import { theme as HubTheme } from '~/styles';

const ThemeContainer: React.FC = ({ children }) => {
  const [theme] = useState<'dark' | 'light' | undefined>('light');

  return (
    <ChakraThemeProvider theme={HubTheme}>
      <ColorModeProvider value={theme}>
        <StyledProvider theme={HubTheme}>
          <EmotionThemeProvider theme={HubTheme}>
            <CSSReset />
            {children}
          </EmotionThemeProvider>
        </StyledProvider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  );
};

export default ThemeContainer;
