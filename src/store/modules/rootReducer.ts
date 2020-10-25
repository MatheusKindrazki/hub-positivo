import { Reducer } from 'react';

import { AnyAction, CombinedState, combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import H from '~/services/history';

import auth from './auth/reducer';

type HistoryState = typeof H;

export default (
  history: HistoryState,
): Reducer<CombinedState<any>, AnyAction> => {
  return combineReducers({
    router: connectRouter(history),
    auth,
  });
};
