/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { all, call, takeLatest, Payload, put } from 'redux-saga/effects';

import { ApiResponse } from 'apisauce';
import { toast } from 'react-toastify';

import { apiAuth } from '~/services/api';

import { Actions, signInFailure } from './actions';
import { SignInRequest, AuthApi } from './types';

type SignInPayload = Payload<SignInRequest>;

interface SendFormData {
  [key: string]: string | Blob;
}

export function* signIn({ payload }: SignInPayload): Generator {
  const sendInfo = {
    ...payload,
    grant_type: process.env.REACT_APP_API_AUTH_TYPE,
    client_id: process.env.REACT_APP_API_AUTH_CLIENT_ID,
    client_secret: process.env.REACT_APP_API_AUTH_SECRET_ID,
    scope: process.env.REACT_APP_API_AUTH_SCOPE,
  };

  const formData = new FormData();

  const send = (sendInfo as unknown) as SendFormData;

  for (const k in sendInfo) {
    formData.append(k, send[k]);
  }

  const response = yield call(() => {
    apiAuth.setHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return apiAuth.post('connect/token', formData);
  });

  const { data, ok } = response as ApiResponse<AuthApi>;

  if (!ok) {
    toast.error('Algo deu errado, verifique seus dados e tente novamente!');

    return yield put(signInFailure());
  }

  // eslint-disable-next-line no-console
  console.log(data?.access_token); // eslint-disable-line;
}

export default all([takeLatest(Actions.SIGN_IN_REQUEST, signIn)]);
