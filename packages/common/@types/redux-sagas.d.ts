import {} from 'redux-saga/effects'

// ? Interface base para o Payload
interface ActionSagas {
  error: undefined
  meta: undefined
  type: string
}

declare module 'redux-saga/effects' {
  export interface Payload<T> extends ActionSagas {
    payload: T
  }
}
