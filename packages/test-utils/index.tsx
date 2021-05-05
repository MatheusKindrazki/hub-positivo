import React, { FC, ReactElement } from 'react'

import { routerMiddleware } from 'connected-react-router'
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'

import './setup'

import { ApplicationState } from '@psdhub/web/src/store/store'
import ThemeProviderHub from '@psdhub/common/layout/Provider'

import {
  CustomRenderOptions,
  Reducers,
  Store,
  CustomState,
  CustomRenderResult
} from './types'
import history from '../apps/hub-web/src/services/history'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const mockStore = configureStore(middlewares)

export const Providers: FC = ({ children }) => {
  return <ThemeProviderHub>{children}</ThemeProviderHub>
}

function getStatesFromStore<T = ApplicationState>(
  store: Store<T>,
  reducers: Reducers<T>[]
): CustomState<T> {
  const applicationState = store.getState()
  return reducers.reduce((accumulator, current) => {
    const initialState = applicationState[current]
    return { [current]: initialState, ...accumulator }
  }, {})
}

function formatState<T = ApplicationState>(
  states: CustomState<T>,
  customState: CustomState<T>
): CustomState<T> {
  if (!customState || !Object.keys(customState).length) return states
  const finalState = Object.entries(states).reduce((accumulator, current) => {
    const reducerName = current[0] as Reducers<T>
    const initialState = states[reducerName]
    return {
      [reducerName]: { ...initialState, ...customState[reducerName] },
      ...accumulator
    }
  }, {})
  return finalState
}

function customRender<T = ApplicationState>(
  ui: ReactElement,
  options?: Omit<CustomRenderOptions, 'queries'>
): CustomRenderResult {
  let CustomProviders: FC = Providers
  let storeUtils
  if (options?.store && options?.reducers) {
    const { store, reducers, CUSTOM_STATE } = options
    const allStates = getStatesFromStore(store, reducers)
    const mockedState = formatState(
      allStates as CustomState<T>,
      CUSTOM_STATE as CustomState<T>
    )
    const mockedStore = mockStore(mockedState)
    const { getActions, clearActions } = mockedStore
    storeUtils = { getActions, clearActions }
    CustomProviders = ({ children }) => (
      <Provider store={mockedStore}>
        <Providers>{children}</Providers>
      </Provider>
    )
  }
  return {
    ...render(ui, { wrapper: CustomProviders, ...options }),
    storeUtils
  } as CustomRenderResult
}

export * from './types'
export * from '@testing-library/react'
export { customRender as render }
