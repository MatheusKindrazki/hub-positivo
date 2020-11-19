import { Reducer } from 'redux';

import { produce } from 'immer';

import { Actions as AuthAction } from '~/store/modules/auth/actions';

import { Actions } from './actions';
import { ProfileReducer } from './types';

export const INITIAL_STATE: ProfileReducer = {
  profile: 'default',
  name: 'Default',
  id: 0,
};

type ReturnReducer = Reducer<ProfileReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SET_PROFILE: {
        draft.id = action.payload.id;
        draft.profile = action.payload.profile;
        draft.name = action.payload.name;
        draft.colorProfile = action.payload.colorProfile;
        draft.icon = action.payload.icon;
        break;
      }

      case Actions.PROFILES: {
        draft.profiles = action.payload;

        break;
      }

      case AuthAction.SIGN_OUT: {
        draft.profile = 'default';
        draft.name = 'Default';
        delete draft.colorProfile;
        delete draft.icon;

        break;
      }
      default:
    }
  });
};

export default auth;
