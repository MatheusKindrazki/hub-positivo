import { all, Payload, put, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';

import { Actions, setProfileRequest } from './actions';
import { SignInRequest } from './types';

const userEnabled = {
  email: 'teste@teste.com.br',
  password: '123456',
};

type SignInPayload = Payload<SignInRequest>;

export function* signIn({ payload }: SignInPayload): Generator {
  const { email, password } = payload;

  if (email === userEnabled.email) {
    if (password === userEnabled.password) {
      yield put(setProfileRequest());

      history.push('/profile');
    } else {
      toast.error('Algo deu errado, verifique seus dados e tente novamente!');
    }
  } else {
    toast.error('Algo deu errado, verifique seus dados e tente novamente!');
  }

  return yield true;
}

export default all([takeLatest(Actions.SIGN_IN_REQUEST, signIn)]);
