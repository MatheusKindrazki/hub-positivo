import { Reducer } from 'react';

import { AnyAction, CombinedState, combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import auth from './auth/reducer';
import global from './global/reducer';
import products from './products/reducer';
import profile from './profile/reducer';

export default (history: History): Reducer<CombinedState<any>, AnyAction> => {
  return combineReducers({
    router: connectRouter(history),
    auth,
    profile,
    products,
    global,
  });
};
