import { Reducer } from 'redux';

import { produce } from 'immer';

import { Actions } from './actions';
import { ExamplesReducer } from './types';

const INITIAL_STATE: ExamplesReducer = {
  data: [],
  loading: false,
  pages: 1,
};

type ReturnReducer = Reducer<ExamplesReducer>;

const clients: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.GET_EXAMPLE_REQUEST: {
        draft.loading = true;
        break;
      }

      case Actions.GET_EXAMPLE_SUCCESS: {
        draft.loading = false;
        draft.data = action.payload.data;
        draft.pages = action.payload.pages;
        break;
      }

      case Actions.GET_EXAMPLE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};

export default clients;
