import { Reducer } from 'redux';

import { produce } from 'immer';

import { Actions as AuthAction } from '~/store/modules/auth/actions';

import { Actions } from './actions';
import { ProfileReducer } from './types';

export const INITIAL_STATE: ProfileReducer = {
  profile: 'default',
  name: 'Default',
};

type ReturnReducer = Reducer<ProfileReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SET_PROFILE: {
        draft.profile = action.payload.profile;
        draft.name = action.payload.name;
        break;
      }

      case AuthAction.SIGN_OUT: {
        draft.profile = 'default';
        break;
      }
      default:
    }
  });
};

export default auth;
