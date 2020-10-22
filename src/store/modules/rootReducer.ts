import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import history from '~/services/history';

import example from './example/reducer';

export default combineReducers({
  router: connectRouter(history),
  example,
});
