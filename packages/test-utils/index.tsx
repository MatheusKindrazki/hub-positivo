import React, { FC, ReactElement } from 'react'

import { routerMiddleware } from 'connected-react-router'
import { render, RenderResult } from '@testing-library/react'
import { RenderOptions } from '@testing-library/react'

import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'

import ThemeProviderHub from '@hub/common/layout/Provider'

import { store } from '../apps/hub-web/src/store'
import history from '../apps/hub-web/src/services/history'
import '@testing-library/jest-dom'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const mockStore = configureStore(middlewares)

export const Providers: FC = ({ children }) => {
  return <ThemeProviderHub>{children}</ThemeProviderHub>
}

type KeyProps<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}

type States = keyof KeyProps<Store.State>
interface CustomRenderOptions extends RenderOptions {
  states?: States[]
  CUSTOM_STATE?: Partial<Store.State>
}

export const getSpecificStates = (states: States[]): Store.State => {
  return states.reduce((finalState, element: States) => {
    const current = store.getState()[element]
    return { [element]: current, ...finalState }
  }, {} as Store.State)
}

function customRender(
  ui: ReactElement,
  options?: Omit<CustomRenderOptions, 'queries'>
): RenderResult {
  let CustomProviders: FC = Providers
  if (options?.states) {
    const { states, CUSTOM_STATE } = options
    const allStates = getSpecificStates(states)

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
