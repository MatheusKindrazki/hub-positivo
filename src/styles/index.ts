import baseStyled, { ThemedStyledInterface } from 'styled-components';

import colors from './colors';
import { device } from './devices';

export const theme = {
  colors,
  devices: { ...device },
};

export type Theme = typeof theme;
const styled = baseStyled as ThemedStyledInterface<Theme>;

export { styled };
