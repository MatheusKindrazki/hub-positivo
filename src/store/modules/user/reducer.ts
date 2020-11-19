import { Reducer } from 'redux';

import { produce } from 'immer';

import { Actions } from './actions';
import { UserReducer } from './types';

export const INITIAL_STATE: UserReducer = {
  loading: false,
  avatar: '',
};

type ReturnReducer = Reducer<UserReducer>;

const user: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SIGN_IN_SUCCESS: {
        delete action.payload.token;
        delete action.payload.iat;
        delete action.payload.auth_time;

        draft.user = action.payload.user;
        draft.loading = false;
        break;
      }
      default:
    }
  });
};

export default user;
