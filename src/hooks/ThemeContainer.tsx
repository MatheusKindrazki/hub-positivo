import React, { useMemo, useState } from 'react';

import {
  ThemeProvider as ChakraThemeProvider,
  ColorModeProvider,
  CSSReset,
} from '@chakra-ui/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { ThemeProvider as StyledProvider } from 'styled-components';

import { theme as HubTheme } from '~/styles';
import profileColors, { VariantsProps } from '~/styles/profileColors';

const ThemeContainer: React.FC = ({ children }) => {
  const [theme] = useState<'dark' | 'light' | undefined>('light');

  const [profile] = useState<VariantsProps>('gestor');

  const renderTheme = useMemo(() => {
    const profileTheme = profileColors({
      profile,
    }).blue;

    const hubThemeProfile = {
      ...HubTheme,
      colors: {
        ...HubTheme.colors,
        blue: profileTheme,
      },
    };

    return hubThemeProfile;
  }, [profile]);

  return (
    <ChakraThemeProvider theme={renderTheme}>
      <ColorModeProvider value={theme}>
        <StyledProvider theme={renderTheme}>
          <EmotionThemeProvider theme={renderTheme}>
            <CSSReset />
            {children}
          </EmotionThemeProvider>
        </StyledProvider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  );
};

export default ThemeContainer;
