/* eslint-disable func-names */
import { all, put, takeLatest } from 'redux-saga/effects';

import history from '~/services/history';

import { Actions, setProfileRequest } from './actions';
// import { SignInRequest } from './types';

// type SignInPayload = Payload<SignInRequest>;

export function* signIn(): Generator {
  yield put(setProfileRequest());

  history.push('/profile');

  return yield true;
}

export default all([takeLatest(Actions.SIGN_IN_REQUEST, signIn)]);
