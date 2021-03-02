import React, { FC, ReactElement } from 'react'

import { routerMiddleware } from 'connected-react-router'
import { render, RenderResult } from '@testing-library/react'

import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'

import ThemeProviderHub from '@hub/common/layout/Provider'

import {
  CustomRenderOptions,
  Reducers,
  Store,
  CustomState,
  CustomRenderResult
} from './types'
import history from '../apps/hub-web/src/services/history'
import '@testing-library/jest-dom'
import { store } from '../apps/hub-web/src/store'
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const mockStore = configureStore(middlewares)

export const Providers: FC = ({ children }) => {
  return <ThemeProviderHub>{children}</ThemeProviderHub>
}

function getStatesFromStore(store: Store, reducers: Reducers[]): CustomState {
  const applicationState = store.getState()
  return reducers.reduce((acumulator, current) => {
    const initialState = applicationState[current]
    return { [current]: initialState, ...acumulator }
  }, {})
}

function formatState(
  states: CustomState,
  customState: CustomState
): CustomState {
  if (!customState) return states
  const finalState = Object.entries(states).reduce((acumulator, current) => {
    const reducerName = current[0] as Reducers
    const initialState = states[reducerName]
    return {
      [reducerName]: { ...initialState, ...customState[reducerName] },
      ...acumulator
    }
  }, {})
  return finalState
}

function customRender(
  ui: ReactElement,
  options?: Omit<CustomRenderOptions, 'queries'>
): CustomRenderResult {
  let CustomProviders: FC = Providers
  let storeUtils
  if (options?.store && options?.reducers) {
    const { store, reducers, CUSTOM_STATE } = options
    const allStates = getStatesFromStore(store, reducers)
    const mockedState = formatState(allStates, CUSTOM_STATE as CustomState)
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
