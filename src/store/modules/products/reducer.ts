import { Reducer } from 'redux';

import { produce } from 'immer';

import { Actions } from './actions';
import { ProductReducer } from './types';

export const INITIAL_STATE: ProductReducer = {
  loading: false,
};

type ReturnReducer = Reducer<ProductReducer>;

const products: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.PRODUCT_REQUEST: {
        draft.loading = true;
        break;
      }

      case Actions.PRODUCT_SUCCESS: {
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      }

      case Actions.PRODUCT_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};

export default products;
