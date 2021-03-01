import React, { FC, ReactElement } from 'react'

import { routerMiddleware } from 'connected-react-router'
import { render, RenderResult } from '@testing-library/react'

import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'

import ThemeProviderHub from '@hub/common/layout/Provider'

import { CustomRenderOptions, Reducers, Store, CustomState } from './types'
import history from '../apps/hub-web/src/services/history'
import '@testing-library/jest-dom'
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const mockStore = configureStore(middlewares)

export const Providers: FC = ({ children }) => {
  return <ThemeProviderHub>{children}</ThemeProviderHub>
}

function getStatesFromStore(store: Store, reducers: Reducers[]): CustomState {
  return reducers.reduce((acumulator, current) => {
    const initialState = store.getState()[current]
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
      [current[0]]: { ...initialState, ...customState[reducerName] },
      ...acumulator
    }
  }, {})
  return finalState
}

function customRender(
  ui: ReactElement,
  options?: Omit<CustomRenderOptions, 'queries'>
): RenderResult {
  let CustomProviders: FC = Providers
  if (options?.store && options?.reducers) {
    const { store, reducers, CUSTOM_STATE } = options
    const allStates = getStatesFromStore(store, reducers)
    const mockedState = formatState(allStates, CUSTOM_STATE as CustomState)
    CustomProviders = ({ children }) => (
      <Provider store={mockStore(mockedState)}>
        <Providers>{children}</Providers>
      </Provider>
    )
  }
  return render(ui, { wrapper: CustomProviders, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
