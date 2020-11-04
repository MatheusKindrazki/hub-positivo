import { theme } from '@chakra-ui/core';
import { lighten, darken } from 'polished';

type Colors = typeof theme.colors;

const profileBaseColor = {
  default: '#1E88E5',
  gestor: '#AD1457',
  professor: '#1565C0',
  aluno: '#EF6C00',
  familia: '#00838F',
};

type StringPropsKeys<T extends { [key: string]: string }> = {
  [P in keyof T]: string;
};

export type VariantsProps = keyof StringPropsKeys<typeof profileBaseColor>;

const HubProfileColors = ({ profile }: { profile: VariantsProps }): Colors => {
  return {
    ...theme.colors,
    blue: {
      '50': lighten(0.5, profileBaseColor[profile]),
      '100': lighten(0.4, profileBaseColor[profile]),
      '200': lighten(0.3, profileBaseColor[profile]),
      '300': lighten(0.2, profileBaseColor[profile]),
      '400': lighten(0.1, profileBaseColor[profile]),
      '500': profileBaseColor[profile],
      '600': darken(0.1, profileBaseColor[profile]),
      '700': darken(0.1, profileBaseColor[profile]),
      '800': darken(0.1, profileBaseColor[profile]),
      '900': darken(0.1, profileBaseColor[profile]),
    },
  };
};

export default HubProfileColors;
