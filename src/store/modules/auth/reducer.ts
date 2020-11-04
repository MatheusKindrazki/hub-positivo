import { Reducer } from 'redux';

import { produce } from 'immer';

import { Actions } from './actions';
import { AuthReducer } from './types';

export const INITIAL_STATE: AuthReducer = {
  signed: false,
  selectProfile: false,
  loading: false,
};

type ReturnReducer = Reducer<AuthReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SIGN_IN_REQUEST: {
        draft.signed = false;
        draft.loading = true;
        break;
      }
      case Actions.SET_PROFILE_REQUEST: {
        draft.selectProfile = true;
        draft.loading = false;
        break;
      }
      case Actions.SIGN_IN_SUCCESS: {
        draft.selectProfile = false;
        draft.signed = true;
        break;
      }
      case Actions.SIGN_OUT: {
        draft.signed = false;
        break;
      }
      default:
    }
  });
};

export default auth;
