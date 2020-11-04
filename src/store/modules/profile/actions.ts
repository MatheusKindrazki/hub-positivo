import { Action } from 'redux';

import { TempProfile } from './types';

export const Actions = {
  SET_PROFILE: '@profiles/SET',
};

/*
  Função temporária para mostrar
  funcionalidade de troca de cor
  dos perfis;
*/

export function tempSetProfile(data: TempProfile): Action {
  return {
    type: Actions.SET_PROFILE,
    payload: data,
  };
}
