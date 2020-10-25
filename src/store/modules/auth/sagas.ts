import { all, put, takeLatest } from 'redux-saga/effects';

import { push } from 'connected-react-router';

import { Actions } from './actions';

export function* signIn(): Generator {
  yield put(push('/profile'));

  return yield true;
}

export default all([takeLatest(Actions.SIGN_IN_REQUEST, signIn)]);
