import { RenderOptions, RenderResult } from '@testing-library/react'

import { Store as ReduxStore } from 'redux'

export type KeyProps<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}

export type Reducers = keyof KeyProps<Store.State>

export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>

export type Store = ReduxStore<Store.State>

export type CustomState = DeepPartial<Store.State>
export interface CustomRenderOptions extends RenderOptions {
  store?: Store
  reducers?: Reducers[]
  CUSTOM_STATE?: CustomState
}

interface StoreUtils {
  getActions: () => any[]
  clearActions: () => void
}

export interface CustomRenderResult extends RenderResult {
  storeUtils?: StoreUtils
}
