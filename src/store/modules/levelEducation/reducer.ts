import { Reducer } from 'redux';

import { produce } from 'immer';

import { Actions } from './actions';
import { EducationReducer } from './types';

export const INITIAL_STATE: EducationReducer = {
  loading: false,
  level: 'Ensino Médio',
};

type ReturnReducer = Reducer<EducationReducer>;

const global: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SET_LEVEL: {
        draft.level = action.payload;
        break;
      }
      default:
    }
  });
};

export default global;
