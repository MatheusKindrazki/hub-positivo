import {} from 'redux-saga/effects';

// ? Interface base para o Payload
interface ActionSagas {
  error: undefined;
  meta: undefined;
  type: string;
}

declare module 'redux-saga/effects' {
  interface ApiResponse {
    data: unknown;
  }

  export interface Payload<T> extends ActionSagas {
    payload: T;
  }
}
