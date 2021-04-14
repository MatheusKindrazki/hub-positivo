import { RenderOptions, RenderResult } from '@testing-library/react'

import { Store as ReduxStore } from 'redux'

export type KeyProps<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}

export type Reducers<T> = keyof KeyProps<T>

export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>

export type Store<T> = ReduxStore<T>

export type CustomState<T> = DeepPartial<T>
export interface CustomRenderOptions<T = Store.State> extends RenderOptions {
  store?: Store<T>
  reducers?: Reducers<T>[]
  CUSTOM_STATE?: CustomState<T>
}

export interface StoreUtils {
  getActions: () => any[]
  clearActions: () => void
}

export interface CustomRenderResult extends RenderResult {
  storeUtils?: StoreUtils
}
