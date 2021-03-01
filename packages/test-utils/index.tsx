import React, { FC, ReactElement } from 'react'

import { routerMiddleware } from 'connected-react-router'
import { render, RenderResult } from '@testing-library/react'

import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'

import ThemeProviderHub from '@hub/common/layout/Provider'

import { CustomRenderOptions, States, Store } from './types'
import history from '../apps/hub-web/src/services/history'
import '@testing-library/jest-dom'
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const mockStore = configureStore(middlewares)

export const Providers: FC = ({ children }) => {
  return <ThemeProviderHub>{children}</ThemeProviderHub>
}

function getSpecificStates<T extends Store>(
  store: T,
  states: States[]
): Store.State {
  return states.reduce((finalState, element) => {
    const current = store.getState()[element]
    return { [element]: current, ...finalState }
  }, {} as Store.State)
}

function customRender<T extends Store>(
  ui: ReactElement,
  options?: Omit<CustomRenderOptions<T>, 'queries'>
): RenderResult {
  let CustomProviders: FC = Providers
  if (options?.states) {
    const { store, states, CUSTOM_STATE } = options
    const allStates = getSpecificStates(store, states)

    CustomProviders = ({ children }) => (
      <Provider store={mockStore({ ...allStates, ...CUSTOM_STATE })}>
        <Providers>{children}</Providers>
      </Provider>
    )
  }
  return render(ui, { wrapper: CustomProviders, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
