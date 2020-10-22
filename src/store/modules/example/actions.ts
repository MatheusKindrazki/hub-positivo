import { Action } from 'redux';

import { ExamplesApiResponse, ExamplesApi } from './types';

export const Actions = {
  GET_EXAMPLE_REQUEST: '@example/GET_EXAMPLE_REQUEST',
  GET_EXAMPLE_SUCCESS: '@example/GET_EXAMPLE_SUCCESS',
  GET_EXAMPLE_FAILURE: '@example/GET_EXAMPLE_FAILURE',
};

/*
  done! Exemplo de actions
*/
export function exampleRequest({ ...data }: ExamplesApi): Action {
  return {
    type: Actions.GET_EXAMPLE_REQUEST,
    payload: { ...data },
  };
}

export function exampleSuccess({ data, pages }: ExamplesApiResponse): Action {
  return {
    type: Actions.GET_EXAMPLE_SUCCESS,
    payload: { data, pages },
  };
}

export function exampleFailure(): Action {
  return {
    type: Actions.GET_EXAMPLE_FAILURE,
  };
}
