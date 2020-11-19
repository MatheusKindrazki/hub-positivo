import { all, call, takeLatest, Payload, put } from 'redux-saga/effects';

import { ApiResponse } from 'apisauce';
import { decode } from 'jsonwebtoken';
import qs from 'qs';
import { toast } from 'react-toastify';

import { apiAuth } from '~/services/api';
import history from '~/services/history';

import { Actions, signInFailure, signInSuccess } from './actions';
import { SignInRequest, AuthApi } from './types';

type SignInPayload = Payload<SignInRequest>;

export function* signIn({ payload }: SignInPayload): Generator {
  const sendInfo = {
    ...payload,
    grant_type: process.env.REACT_APP_API_AUTH_TYPE,
    client_id: process.env.REACT_APP_API_AUTH_CLIENT_ID,
    client_secret: process.env.REACT_APP_API_AUTH_SECRET_ID,
    scope: process.env.REACT_APP_API_AUTH_SCOPE,
  };

  const response = yield call(() => {
    apiAuth.setHeaders({
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      accept: '*/*',
    });

    return apiAuth.post(
      'https://sso.specomunica.com.br/connect/token',
      qs.stringify(sendInfo),
    );
  });

  const { data, ok } = response as ApiResponse<AuthApi>;

  if (!ok) {
    toast.error('Algo deu errado, verifique seus dados e tente novamente!');

    return yield put(signInFailure());
  }

  const user = decode(data?.access_token || '') as any;

  yield put(
    signInSuccess({
      token: data?.access_token || '',
      auth_time: user?.auth_time,
      iat: user?.iat,
      user: {
        email: user?.email,
        name: user?.username,
        schools: user?.schools,
      },
    }),
  );

  return history.push('/profile');
}

export default all([takeLatest(Actions.SIGN_IN_REQUEST, signIn)]);
