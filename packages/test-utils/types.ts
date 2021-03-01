import { RenderOptions } from '@testing-library/react'

import { Store as ReduxStore } from 'redux'

export type KeyProps<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}

export type States = keyof KeyProps<Store.State>

export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>

export type Store = ReduxStore<Store.State>

export interface CustomRenderOptions<T> extends RenderOptions {
  store: T
  states?: States[]
  CUSTOM_STATE?: DeepPartial<Store.State>
}
