import { Reducer } from 'redux';

import { produce } from 'immer';

import { Actions } from './actions';
import { AuthReducer } from './types';

const INITIAL_STATE: AuthReducer = {
  signed: false,
  selectProfile: false,
};

type ReturnReducer = Reducer<AuthReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SIGN_IN_REQUEST: {
        draft.signed = true;
        break;
      }
      default:
    }
    switch (action.type) {
      case Actions.SIGN_OUT: {
        draft.signed = false;
        break;
      }
      default:
    }
  });
};

export default auth;