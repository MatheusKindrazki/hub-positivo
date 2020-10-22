import { all, takeLatest, call, put, Payload } from 'redux-saga/effects';

import { ApiResponse } from 'apisauce';

import api from '~/services/api';

import { Actions, exampleFailure, exampleSuccess } from './actions';
import { ExampleProps, ExamplesApi } from './types';

/*
  done! Busca dados dos clientes
*/
type ClientsPayload = Payload<ExampleProps>;

export function* getExample({ payload }: ClientsPayload): Generator {
  const response = yield call(() => {
    return api.get('clients', payload);
  });

  const { data, ok } = response as ApiResponse<ExamplesApi[]>;
  if (!ok) {
    yield put(exampleFailure());

    return;
  }

  yield put(exampleSuccess({ data, pages: 1 }));
}

export default all([takeLatest(Actions.GET_EXAMPLE_REQUEST, getExample)]);
