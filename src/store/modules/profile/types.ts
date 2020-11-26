import { VariantsProps } from '~/styles/profileColors';

export interface ProfileReducer {
  guid: number | string;
  profile: unknown;
  name: string;
  icon?: string;
  colorProfile?: string;
  profiles?: Profiles[];
}

export interface Profile {
  name: string;
  profile: VariantsProps;
  guid: string;
}

export interface Profiles {
  id: string;
  name: string;
  icon: string;
  colorProfile: string;
}
