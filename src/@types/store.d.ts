import { Action as Ac } from 'redux';

declare module 'redux' {
  interface Action<T> extends Ac {
    payload?: T;
  }

  interface ReducerProps<T> {
    payload: T;
    type: string;
  }
}
