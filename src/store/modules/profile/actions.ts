import { Action } from 'redux';

import { VariantsProps } from '~/styles/profileColors';

export const Actions = {
  SET_PROFILE: '@profiles/SET',
};

/*
  Função temporária para mostrar
  funcionalidade de troca de cor
  dos perfis;
*/

export function tempSetProfile(profile: VariantsProps): Action {
  return {
    type: Actions.SET_PROFILE,
    payload: profile,
  };
}
