import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import history from '~/services/history';

import auth from './auth/reducer';

export default combineReducers({
  auth,
  router: connectRouter(history),
});
