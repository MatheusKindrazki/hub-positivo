import { VariantsProps } from '~/styles/profileColors';

export interface ProfileReducer {
  profile: unknown;
  name: string;
}

export interface TempProfile {
  name: string;
  profile: VariantsProps;
}
